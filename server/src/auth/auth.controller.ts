import { Body, Controller, Get, Req, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { password: string, username: string }): Promise<void> {
        const response = await this.authService.registerUser(body.password, body.username);
        return response
    }

    @Post('login')
    async login(@Body() body: { password: string, username: string }): Promise<void> {
        const response = await this.authService.login(body.password, body.username);
        return response
    }

    // lay thong tin cua 1 user
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req) {
        return await this.authService.getUser(req.user.userId)
    }

    // hiển thị toàn bộ user
    @UseGuards(AuthGuard('jwt'))
    @Get('users')
    async getAllUsers(@Query('page') page: number = 1, @Request() req: any) {
        const userId = req.user.userId
        return await this.authService.getAllUsers(page, userId);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    async updateUser(@Body() body, @Req() req) {
        console.log('oke')
        const userId = req.user.userId
        const response = await this.authService.updateUser(body, userId);
        return response
    }
}
