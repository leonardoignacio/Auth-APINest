import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController{
    constructor( private readonly authService : AuthService){}
    @Post('login')
    @HttpCode(HttpStatus.OK)
    signin(@Body() body: Prisma.UserCreateInput){
        return this.authService.signin(body);
    }
}

