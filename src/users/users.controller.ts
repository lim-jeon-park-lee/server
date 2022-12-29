import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return this.usersService.create(userCreateDto);
  }
}
