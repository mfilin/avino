import next from 'next';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { NextServer } from 'next/dist/server/next';
import { PortalService } from '../portal/portal.service';
import { DEFAULT_API_PREFIX } from '../core/const';

@Injectable()
export class NextMiddleware implements NestMiddleware {
  private nextServer: NextServer;
  private logger: Logger = new Logger(NextMiddleware.name);
  private apiPrefix: string = DEFAULT_API_PREFIX;
  private ready: boolean = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly portalService: PortalService,
  ) {
    this.apiPrefix = configService.get<string>('apiPrefix');
    this.prepareNextApplication(process.env.NODE_ENV === 'development').catch(
      (err) => {
        this.logger.error(
          `Prepare NEXT application failed: ${JSON.stringify(
            err.message,
            null,
            2,
          )}\n${err.stack}`,
        );
      },
    );
  }

  async use(req: Request, res: Response, nextMiddleware: NextFunction) {
    // console.error(req.method, req.originalUrl, '[NextMiddleware]');
    if (req.url.startsWith(this.apiPrefix)) {
      if (req.url.indexOf('/cache') < 0) {
        return nextMiddleware();
      }
    }

    if (!this.ready) {
      return {
        error: 'Server building',
      };
    }

    res.locals.portalService = this.portalService;
    res.locals.configService = this.configService;
    res.locals.isMobile = true;

    await this.nextServer.getRequestHandler()(req, res);
  }

  private async prepareNextApplication(devMode: boolean) {
    // this.nextServer = next({ dev: devMode, dir: './dist' });
    this.logger.verbose('Start build NEXT middleware');
    this.nextServer = next({ dev: devMode, dir: './', customServer: true });
    this.logger.verbose('Start NEXT preparation');
    await this.nextServer.prepare();
    this.logger.verbose('NEXT application preparation finished');
    this.ready = true;
  }
}
