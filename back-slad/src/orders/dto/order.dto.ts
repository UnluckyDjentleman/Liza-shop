import { IsDate, IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class OrderDTO{
    @IsInt()
    product_id: number;

    @IsInt()
    quantity: number;
}