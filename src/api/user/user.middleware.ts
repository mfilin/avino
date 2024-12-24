import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { DEFAULT_API_PREFIX } from '../core/const';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(UserMiddleware.name);

  private apiPrefix: string = DEFAULT_API_PREFIX;
  private jwtKey: string = '';
  private jwtCookieName: string = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.apiPrefix = configService.get<string>('apiPrefix');
    this.jwtKey = configService.get<string>('app.jwtKey');
    this.jwtCookieName = configService.get<string>('app.jwtCookieName');
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.url.startsWith(this.apiPrefix)) {
      return next();
    }

    const token = req.cookies?.[this.jwtCookieName];
    if (token) {
      try {
        req.user = jwt.verify(token, this.jwtKey);
        // console.log(req.user);
      } catch (error) {}
    }

    return next();
  }
}
