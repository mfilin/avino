import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { PolicyDto } from './policy.dto';
// import { Role } from '../../core/policies';

// login', 'name', 'surname', 'policies', 'is_admin

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  // @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly login: string;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly surname: string;

  @IsBoolean()
  @IsOptional()
  readonly is_admin: boolean;

  readonly policies?: Record<string, string>;
}
