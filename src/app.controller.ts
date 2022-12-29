import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { LoginInfoDto } from './auth/auth.dto';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() loginInfo: LoginInfoDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginInfo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
