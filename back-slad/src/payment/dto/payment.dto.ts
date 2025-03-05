import { IsNumber } from "class-validator";

export class PaymentDTO{
    @IsNumber()
    order_id: number;
}