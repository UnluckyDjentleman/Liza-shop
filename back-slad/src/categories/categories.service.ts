import { BadGatewayException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class CategoriesService {

    constructor(private readonly supabaseService: SupabaseService){}

    async getCategories(){
        const {data, error}=await this.supabaseService.getClient().from("categories").select("*");
        if(error) throw new BadGatewayException("Невозможно выбрать категорию..."+error.message);
        return data;
    }
}
