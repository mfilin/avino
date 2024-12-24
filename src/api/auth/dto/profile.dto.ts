import { IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../interface/user.interface';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  readonly role: RoleEnum;
}
