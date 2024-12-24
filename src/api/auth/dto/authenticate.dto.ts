import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
