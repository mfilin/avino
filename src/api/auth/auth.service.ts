import crypto from 'crypto';
import util from 'node:util';
import jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticUtilService } from '../elastic/elastic.util.service';
import { ADMIN_USER_ID, USERS_INDEX_NAME } from '../core/const';
import { UserDto } from '../user/dto/user.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  private passwordSalt: string = '';
  private jwtKey: string = '';

  constructor(
    private readonly elastic: ElasticsearchService,
    private readonly elasticUtil: ElasticUtilService,
    private readonly configService: ConfigService,
  ) {
    this.passwordSalt = this.configService.get<string>('app.passwordSalt');
    this.jwtKey = configService.get<string>('app.jwtKey');
  }

  public async createUserJWTToken(userDto: UserDto): Promise<string> {
    const token: TokenDto = {
      id: userDto.id,
      login: userDto.login,
      is_admin: userDto.is_admin,
      ts: Date.now(),
      policies: userDto.policies,
    };

    // TODO: encrypt jwt token with crypto
    const result = jwt.sign(
      {
        [Math.random() * 1000]: Date.now() % 789,
        ...token,
        [Math.random() * 1000]: Date.now() % 123,
      },
      this.jwtKey,
    );

    return result;
  }

  public passwordHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.scrypt(password, this.passwordSalt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
  }

  // async authenticate(authDto: AuthenticateDto) {
  //   const res = await this.elastic.search({
  //     index: USERS_INDEX_NAME,
  //   });
  //   // this.elastic.search();
  // }

  async resetAdminPassword(newPassword: string) {
    const index = USERS_INDEX_NAME;
    const hashedPassword = await this.passwordHash(newPassword);
    const res = await this.elastic.update({
      index,
      id: ADMIN_USER_ID,
      doc: {
        password: hashedPassword,
        is_admin: true,
      },
      doc_as_upsert: true,
    });

    this.logger.verbose(
      `Admin password change successful, operation: ${res.result}`,
    );
    await this.elasticUtil.refreshIndex(index);
    // await this.elasticUtil.mergeIndex(index);
  }

  async resetAdminLogin(newLogin: string) {
    const index = USERS_INDEX_NAME;
    const res = await this.elastic.update({
      index,
      id: ADMIN_USER_ID,
      doc: {
        login: newLogin,
        is_admin: true,
      },
      doc_as_upsert: true,
    });

    this.logger.verbose(
      `Admin login - change successful, operation: `,
      res.result,
    );
    await this.elasticUtil.refreshIndex(index);
    // await this.elasticUtil.mergeIndex(index);
  }
}
