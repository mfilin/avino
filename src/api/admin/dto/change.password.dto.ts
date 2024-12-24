import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  // MaxLength,
  Matches,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  // @MinLength(6)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  readonly password: string;
}
