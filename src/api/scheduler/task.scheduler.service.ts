import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskSchedulerService {
  private logger: Logger = new Logger(TaskSchedulerService.name);

  constructor(private readonly configService: ConfigService) {
    this.logger.log('CREATE SCHEDULER SERVICE');
  }

  // https://docs.nestjs.com/techniques/task-scheduling
  // Execute task every minute
  // @Cron('*/10 * * * * *')
  @Cron(CronExpression.EVERY_10_HOURS)
  // @Interval(10000)
  checkBuildRevisionJob() {
    // this.logger.log('Execute check build revision job');
    // this.logger.log(this.configService.get('app.cacheValidationKey'));
    // this.configService.set('A', 333);
    // console.log(this.configService);
    // revalidatePath('/[...slug]');
    // revalidatePath('/');
  }
}
