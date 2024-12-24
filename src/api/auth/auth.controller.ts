import {
  Controller,
  Post,
  Res,
  Body,
  ValidationPipe,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { userToProfileUser } from '../profile/converters';
// import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  private jwtCookieName: string;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.jwtCookieName = configService.get<string>('app.jwtCookieName');
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) authDto: AuthenticateDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const passwordHash = await this.authService.passwordHash(authDto.password);

    const user = await this.userService.loadUserByNameAndPassword(
      authDto.name,
      passwordHash,
    );

    // console.log('[login]');
    // console.log('user: ', user);

    if (user) {
      const token = await this.authService.createUserJWTToken(user);
      // console.log(token);
      response.cookie(this.jwtCookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return userToProfileUser(user);
    }

    throw new ForbiddenException({
      code: 'login-failed',
      message: 'Login or password incorrect',
    });
  }
}
