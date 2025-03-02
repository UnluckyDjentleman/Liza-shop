import {IsNotEmpty, IsEmail, IsStrongPassword} from 'class-validator'

export class SigninDTO{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}