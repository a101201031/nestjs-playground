import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@src/auth';
import { JwtAuthGuard, LocalAuthGuard, Public } from '@src/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 초기 로그인에는 localAuthGuard
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 로그인 이후에는 JwtAuthGuard
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
