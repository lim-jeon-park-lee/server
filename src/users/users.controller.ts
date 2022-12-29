import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserCreateDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') userId) {
    return this.usersService.findOne(userId);
  }

  @Post()
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return this.usersService.create(userCreateDto);
  }
}
