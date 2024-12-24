// import { PortalService } from '../../api/portal/portal.service';
// import { INestApplication } from '@nestjs/common';

declare namespace Express {
  interface Request {
    user: UserDto;
  }
  interface Response {
    locals: {
      portalService: PortalService;
      configService: ConfigService;
    };
  }
}
