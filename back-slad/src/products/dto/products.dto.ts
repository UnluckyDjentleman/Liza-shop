import { IsNumber, IsString, IsUrl, IsUUID } from "class-validator";
import {Type} from 'class-transformer'

export class ProductDTO{
    @IsString()
    name: string;
    
    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsUrl()
    photo: string;

    @IsNumber()
    @Type(()=>Number)
    category_id: number;

    @IsUUID()
    customer_id: string;
}