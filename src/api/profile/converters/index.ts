import { UserDto } from '../../user/dto/user.dto';
import { ProfileDto } from '../dto/profile.dto';

export function userToProfileUser(user: UserDto): ProfileDto {
  return {
    name: user.name,
    login: user.login,
    surname: user.surname,
  };
}
