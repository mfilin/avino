import { IsString, IsOptional, IsNumberString } from 'class-validator';
import { IsBiggerThan, IsLessThan } from '../decorators/custom.validators';

export class QueryProductDto {
  @IsOptional()
  readonly filters: string[];

  @IsString()
  @IsOptional()
  readonly order: string;

  @IsString()
  @IsOptional()
  readonly orderDesc: string;

  @IsNumberString()
  @IsOptional()
  @IsBiggerThan(1, {
    message: 'Size must be greater than 1',
  })
  @IsLessThan(100, {
    message: 'Size cannot be bigger than 100',
  })
  readonly size: number;

  @IsNumberString()
  @IsOptional()
  @IsBiggerThan(1, {
    message: 'Page cannot be less than 1',
  })
  readonly page: number;
}
