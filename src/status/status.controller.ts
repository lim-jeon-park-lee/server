import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserStatus(@Request() request) {
    const user = request.user;
    return this.statusService.getUserStatusOfUser(user.id);
  }
}
