import { Injectable } from '@nestjs/common';
import { PaymentDTO } from './dto/payment.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class PaymentService {
    constructor(private readonly supabaseService: SupabaseService){}
    async saveThePayment(dto: PaymentDTO, amount: number){
        const {order_id}=dto;
        const {data, error}=await this.supabaseService.getClient().from("payments").insert({
            order_id,
            amount,
            payment_date: new Date()
        })
        if (error) throw new Error("Неудачно прошлла оплата");
        return data;
    }
}
