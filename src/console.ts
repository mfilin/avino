import { CommandFactory } from 'nest-commander';
import { ConsoleModule } from './api/console/console.module';

async function bootstrap() {
  await CommandFactory.run(
    ConsoleModule,
    ['error', 'warn', 'verbose'],
    //['warn', 'error', 'log']
  );
}

bootstrap().catch(console.error);
