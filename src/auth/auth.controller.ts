import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.authService.validateUser(loginUserDto.username, loginUserDto.password);
        if (!user) {
            return { message: 'Oops Invalid credentials'};
        }
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
