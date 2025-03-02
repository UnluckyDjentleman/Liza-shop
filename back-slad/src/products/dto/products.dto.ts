import { IsNumber, IsString, IsUrl, IsUUID } from "class-validator";

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
    category_id: number;

    @IsUUID()
    customer_id: string;
}