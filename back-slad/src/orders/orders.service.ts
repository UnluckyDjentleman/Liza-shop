import { BadGatewayException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { OrderDTO } from './dto/order.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateOrderDTO } from './dto/updateOrder.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly configService: ConfigService
    ){}

    async addOrder(user, dto: OrderDTO){
        if(!user) throw new UnauthorizedException("Для оформления заказа Вам необходимо зарегистрироваться или войти в аккаунт")
        const {product_id, quantity}=dto;
        const order=await this.supabaseService.getClient().from("orders").insert({
            order_date: new Date(),
            status: this.configService.get<string>("IN_CASE"),
            user_id: user.id,
        }).select();
        if(order.error){
            throw new Error("Не удалось сохранить заказ... "+order.error.message);
        }
        const order_item=await this.supabaseService.getClient().from("order_items").insert({
            order_id: order.data[0].id,
            product_id,
            quantity
        });
        if(order_item.error){
            throw new Error("Не удалось записать заказ в хранилище... "+order_item.error.message)
        }
        return order_item.data;
    }

    async updateOrder(user, id: number, dto: UpdateOrderDTO){
        const {product_id, quantity}=dto
        //Is User On System
        if(!user) throw new UnauthorizedException("Для этой операции необходима регистрация или авторизация");
        
        const orderToUpdate=await this.supabaseService.getClient().from("orders").select("*").eq('id',id);
        //Is this order belongs to user
        if(orderToUpdate.data[0].user_id!==user.id) throw new ForbiddenException("Вы не можете обновить этот заказ!!! Ибо он не ваш");
        
        const updatedOrder=await this.supabaseService.getClient().from("orders").update({
            order_date: new Date(),
            status: this.configService.get<string>("UPDATED")
        }).eq('id',id);
        const updatedOrderItem=await this.supabaseService.getClient().from("order_items").update({
            quantity
        }).eq("order_id",id);
        if(updatedOrder.error||updatedOrderItem.error) throw new Error("Не удалось обновить заказ")
        return updatedOrder.data;
    }

    async deleteOrder(user, id: number){
        if(!user) throw new UnauthorizedException('Для данной операции зарегистируйтесь или войдите в свой аккаунт');
        const {data, error}=await this.supabaseService.getClient().from("orders").delete().eq('id',id);
        if(error) throw new Error("Не удалось удалить заказ"+error.message)
        return data;
    }

    async getOrderById(user, id: number){
        if(!user) throw new UnauthorizedException('Для данной операции зарегистируйтесь или войдите в свой аккаунт');
        const {data, error}=await this.supabaseService.getClient().from("order_items").select("id, quantity, orders(user_id), products(id, name, description, price)").eq('order_id',id);
        console.log(data);
        //Is this order belongs to user
        if(data[0].orders["user_id"]!==user.id&&user.role!=='admin') throw new ForbiddenException("Этот заказ не Ваш!");
        return data;
    }

    async getUserOrders(user){
        if(!user) throw new UnauthorizedException('Для данной операции зарегистируйтесь или войдите в свой аккаунт');
        const {data, error}=await this.supabaseService.getClient().from("order_items").select("id, quantity, orders(user_id), products(id, name, description, price)").eq('orders.user_id',user.id);
        console.log(data);
        //Is this order belongs to user
        if(data[0].orders["user_id"]!==user.id) throw new ForbiddenException("Этот заказ не Ваш!");
        return data;
    }

    async getAllOrders(user){
        if(!user) throw new UnauthorizedException('Для данной операции зарегистируйтесь или войдите в свой аккаунт');
        const orderNeeded:{data, error}=await this.supabaseService.getClient().from("order_items").select("id, quantity, orders(user_id), products(id, name, description, price)");
        //Is this order belongs to user
        if(user.role!=='admin') throw new ForbiddenException("Этот заказ не Ваш!");
        return orderNeeded.data;
    }
}
