import {IsNotEmpty, IsEmail, IsStrongPassword} from 'class-validator'

export class AuthDTO{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}