import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}


 @Post('/login')
 @UseGuards(AuthGuard("local"))
 login(@Request() req): any {
  const token = this.authService.generateToken(req.user);
  return token
 }

  @Get()
  @Render('index')
  root() {
    return { movies: [] };
  }
  
  
  }

