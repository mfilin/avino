import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth/auth.service';

@Command({
  name: 'admin',
  description: 'Admin manipulation commander stack',
})
export class AdminCommand extends CommandRunner {
  private readonly logger: Logger = new Logger(AdminCommand.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly inquirerService: InquirerService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  @Option({
    flags: '-p, --password [string]',
    required: false,
    defaultValue: null,
    name: 'password',
    description: 'Setup admin password',
  })
  parseNewPassword(val: string): string {
    return val;
  }

  @Option({
    flags: '-l, --login [string]',
    required: false,
    defaultValue: null,
    name: 'login',
    description: 'Setup admin login',
  })
  parseNewLogin(val: string): string {
    return val;
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    try {
      if (options.password) {
        const { password } = await this.inquirerService.ask(
          'password',
          options.password === true ? {} : options,
        );

        await this.authService.resetAdminPassword(password);
      } else if (options.login) {
        const { login } = await this.inquirerService.ask(
          'login',
          options.login === true ? {} : options,
        );

        await this.authService.resetAdminLogin(login);
      } else {
        this.logger.error(`Unknown command`);
      }
    } catch (error) {
      console.error(error);
      this.logger.error(
        `Change admin password failed due to error ${error.message}`,
        error,
      );
    }
  }
}
