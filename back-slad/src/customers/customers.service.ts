import { BadGatewayException, Injectable } from '@nestjs/common';
import { CustomerDTO } from './dto/customer.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UpdateCustomerDTO } from './dto/updateCustomer.dto';

@Injectable()
export class CustomersService {

    constructor(private supabaseService: SupabaseService){}

    async createCustomer(dto: CustomerDTO){
        const {name, email, phone}=dto;
        const {data, error}=await this.supabaseService.getClient().from("customers").insert({
            name,
            email,
            phone
        });
        if(error) throw new BadGatewayException("Невозможно добавить поставщика..."+error.message)
        return data;
    }

    async updateCustomer(id: string, dto: UpdateCustomerDTO){
        const {name, email, phone}=dto;
        const {data, error}=await this.supabaseService.getClient().from("customers").update({
            name,
            email,
            phone
        }).eq('id',id)
        if (error) throw new BadGatewayException("Невозможно обновить поставщика..."+error.message);
        return data;
    }

    async deleteConsumer(id: string){
        const {data, error}=await this.supabaseService.getClient().from("customers").delete().eq('id',id)
        if (error) throw new BadGatewayException("Не удалось удалить данного поставщика..."+error.message);
        return data;
    }

    async getCustomers(){
        const {data, error}=await this.supabaseService.getClient().from("customers").select("*");
        if(error) throw new BadGatewayException("Невозможно выбрать поставщиков..."+error.message);
        return data;
    }
}
