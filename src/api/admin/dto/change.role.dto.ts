import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly domain: string;

  readonly value: string | undefined | null;
}
