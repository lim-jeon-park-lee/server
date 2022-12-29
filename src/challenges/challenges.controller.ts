import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  findAll() {
    return this.challengesService.findAll();
  }

  @ApiOperation({ description: '결투를 신청할 상대방의 userId를 입력하세요.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() request, @Body() createChallengeDto: CreateChallengeDto) {
    const hostUserId = request.user.id;
    const invitedUserId = createChallengeDto.userId;
    return this.challengesService.create(hostUserId, invitedUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/accept')
  async accept(@Request() request, @Param('id') id) {
    const challenge = await this.challengesService.findOne(id);
    const userId = request.user.id;
    if (challenge.invitedUserId !== userId) throw new UnauthorizedException();
    await this.challengesService.accept(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post(':id/reject')
  // async reject(@Request() request, @Param('id') id) {
  //   const challenge = await this.challengesService.findOne(id);
  //   const userId = request.user.id;
  //   if (challenge.invitedUserId !== userId) throw new UnauthorizedException();
  //   await this.challengesService.reject(id);
  // }
}
