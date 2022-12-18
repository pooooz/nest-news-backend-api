import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from './users/auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './users/auth/auth.service';
import { LocalAuthGuard } from './users/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: ExpressRequest) {
    console.log('here');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
