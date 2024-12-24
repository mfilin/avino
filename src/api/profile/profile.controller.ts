import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.decorator';
import { ProfileDto } from './dto/profile.dto';
import { userToProfileUser } from './converters';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  @Get('me')
  async getUserProfile(@User() user: UserDto) {
    const profile: ProfileDto = userToProfileUser(user);

    return profile;
  }
}
