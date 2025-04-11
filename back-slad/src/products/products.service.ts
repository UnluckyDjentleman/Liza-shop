import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { ProductDTO } from './dto/products.dto';
import { UpdateProductsDTO } from './dto/updateProduct.dto';
import { ProdQueryDto } from './dto/prodQuery.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ProductsService {

    constructor(private supabaseService: SupabaseService){}

    async createProduct(dto: ProductDTO){
        const {data, error}=await this.supabaseService.getClient().from("products").insert({
            name: dto.name,
            description: dto.description,
            price: dto.price,
            category_id: dto.category_id,
            photo: dto.photo,
            customer_id: dto.customer_id
        })
        if (error) throw new NotImplementedException("Cannot create product");
        return data;
    }
    async updateProduct(id: string, dto: UpdateProductsDTO){
        const {data, error}=await this.supabaseService.getClient().from("products").update({
            name: dto.name,
            description: dto.description,
            price: dto.price,
            category_id: dto.category_id,
            photo: dto.photo,
            customer_id: dto.customer_id
        }).eq('id',id)
        if (error) throw new NotImplementedException("Cannot update product");
        return data;
    }
    async deleteProduct(id: string){
        return await this.supabaseService.getClient().from("products").delete().eq('id',id);
    }
    async getProducts(filter: ProdQueryDto){
        const {name, category_id, customer_id}=filter;
        let query=this.supabaseService.getClient().from("products").select('id, name, description, price, photo, category: categories(name), customer: customers(name)');
        if(name){
            query=query.ilike("name",`${name}`)
        }
        if(category_id){
            query=query.eq("category_id",`${category_id}`)
        }
        if(customer_id){
            query=query.eq("customer_id",`${customer_id}`)
        }
        const {data, error}=await query;
        if (error) throw new NotFoundException("Cannot get products"+error.message);
        return data;
    }
    async getProductById(id: string){
        const {data, error}=await this.supabaseService.getClient().from("products").select('id, name, description, price, photo, category: categories(name), customer: customers(name)').eq('id',id);
        if (error) throw new NotFoundException(`Cannot find product with ID ${id}`);
        return data[0];
    }
}
