import util from 'node:util';
import { v4 as uuidv4 } from 'uuid';
import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { USERS_INDEX_NAME } from '../core/const';
import { UserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { TChangePassStatus } from './types';
import { ROLES, POLICY } from '../core/policies';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    private readonly elastic: ElasticsearchService,
    private readonly authService: AuthService,
  ) {}

  public async createNewUser(userDto: UserDto) {
    const index = USERS_INDEX_NAME;
    const loginRes = await this.elastic.search({
      index,
      query: {
        bool: {
          must: [{ term: { [`login`]: { value: userDto.login } } }],
          boost: 1,
        },
      },
    });

    if (loginRes.hits.hits.length) {
      throw new BadRequestException('Login busy');
    }

    const newId = uuidv4();

    try {
      await this.elastic.create({
        index,
        id: newId,
        body: userDto,
      });

      await this.elastic.indices.refresh({
        index,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }

    return newId;
  }

  public async loadUserByNameAndPassword(
    userName: string,
    password: string,
  ): Promise<UserDto | null> {
    // login and password field types: keyword
    // that's why no needed to use word "keyword" in term key
    const query = {
      bool: {
        must: [
          { term: { [`login`]: { value: userName } } },
          { term: { [`password`]: { value: password } } },
        ],
        boost: 1,
      },
    };

    const res = await this.elastic.search<UserDto>({
      index: USERS_INDEX_NAME,
      query,
      _source: ['login', 'name', 'surname', 'policies', 'is_admin'],
    });

    if (res.hits.hits?.length) {
      const user: UserDto = {
        ...res.hits.hits[0]._source,
        id: res.hits.hits[0]._id,
      } as UserDto;

      return user;
    }

    return null;
  }

  public async loadUserById(id: string): Promise<UserDto | undefined> {
    const index = USERS_INDEX_NAME;
    const res = await this.elastic.search<UserDto>({
      index,
      query: {
        ids: {
          values: [id],
        },
      },
    });

    return res.hits.hits?.[0]?._source;
  }

  async updateUserPassword(
    id: string,
    newPassword: string,
  ): Promise<{ status: TChangePassStatus; error?: Error }> {
    const index = USERS_INDEX_NAME;
    const hashedPassword = await this.authService.passwordHash(newPassword);

    try {
      const res = await this.elastic.update({
        index,
        id,
        doc: {
          password: hashedPassword,
        },
        doc_as_upsert: false,
      });

      return { status: res.result as TChangePassStatus, error: null };
    } catch (error) {
      this.logger.error(`Change user (${id}) password failed: `, error);
      return { status: 'error', error };
    }
  }

  async updateUserRole(
    id: string,
    domain: string,
    value: string | undefined | null,
  ) {
    const index = USERS_INDEX_NAME;
    const user: UserDto | undefined = await this.loadUserById(id);

    if (!user) {
      this.logger.error(
        new Error(`Update user (${id}) role failed: user not found`),
      );

      return;
    }

    if (!ROLES.hasOwnProperty(domain)) {
      const error = new Error(
        `Change role ${domain} failed: role does not exists`,
      );
      this.logger.error(error);
      throw error;
    }

    if (value && !POLICY.hasOwnProperty(value)) {
      const error = new Error(
        `Change role ${domain} failed: access type ${value} does not exists`,
      );
      this.logger.error(error);
      throw error;
    }

    const policies = user.policies ? { ...user.policies } : {};

    if (value) {
      // update
      policies[domain] = value;
    } else {
      // remove
      delete policies[domain];
    }

    await this.elastic.update({
      index,
      id,
      doc: { ...user, policies },
      doc_as_upsert: true,
    });
  }
}
