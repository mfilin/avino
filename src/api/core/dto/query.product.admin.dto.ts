import { IsString, IsOptional, IsNumberString } from 'class-validator';
import { IsBiggerThan, IsLessThan } from '../decorators/custom.validators';
import { QueryProductDto } from './query.product.dto';

export class QueryProductAdminDto extends QueryProductDto {
  @IsOptional()
  @IsString()
  readonly dateFrom: string;

  @IsOptional()
  @IsString()
  readonly dateTo: string;

  @IsOptional()
  @IsString()
  readonly queryStr: string;
}
