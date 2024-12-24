import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, LogLevel } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import cors from 'cors';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // To setup logs, you need to use .env file, variable LOGS
  app.useLogger(app.get(ConfigService).get<LogLevel[]>('app.logs'));
  const logger = new Logger(AppModule.name);
  const port = app.get(ConfigService).get('port');
  const host = app.get(ConfigService).get('host');
  const apiPrefix = app.get(ConfigService).get('apiPrefix');

  logger.log(`API globally mapped to ${apiPrefix}`);
  app.setGlobalPrefix(apiPrefix, {
    exclude: ['/*'],
  });

  app.use(cookieParser());
  app.use(
    cors({
      origin: (origin, callback) => {
        callback(undefined, true);
      },
      credentials: true,
    }),
  );

  await app.listen(port, host);
  logger.log(`App listening on http://${host}:${port}`);
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}

bootstrap();
