import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { SigninDTO } from './dto/signin.dto';
import {Response, Request} from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('signup')
    async signUpController(@Body() dto: AuthDTO){
        return await this.authService.addUser(dto)
        //await this.authService.addUser(dto);
    }

    @Post('signin')
    async signInController(@Body() dto: SigninDTO, @Res() res:Response){
        const token=await this.authService.signinUser(dto);
        res.set('Authorization', `Bearer ${token.token}`);
        return res.json(token);
    }

    @Post('refresh')
    async refreshToken(@Req() req: Request, @Res() res: Response){
        const token: string=req.headers.authorization?.split(' ')[1];
        console.log(token) 
        const newToken=await this.authService.refreshToken(token);
        res.set('Authorization', `Bearer ${newToken.token}`);
        return res.json(newToken);
    }

    @Post('logout')
    async logoutController(@Req() req: Request, @Res() res: Response) {
        const userId:string = req.headers.authorization?.split(' ')[1];
        const result=await this.authService.logout(userId);
        if(result.message){
            res.setHeader('Authorization', '');
        }
        return res.json({message: "Logged out"});
    }
}
