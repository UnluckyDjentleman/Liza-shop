import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {Request} from 'express';
import { GetUser } from 'src/auth/decorator/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import RolesGuard from 'src/auth/guard/role.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get('me')
    async getMe(@GetUser() user){
        return await this.userService.GetMe(user);
    }
}
