import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CustomerDTO{
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phone: string;
}