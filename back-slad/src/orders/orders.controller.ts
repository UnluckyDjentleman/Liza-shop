import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import RolesGuard from 'src/auth/guard/role.guard';
import { OrderDTO } from './dto/order.dto';
import { UpdateOrderDTO } from './dto/updateOrder.dto';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {

    constructor(private readonly orderService: OrdersService){}

    @UseGuards(RolesGuard)
    @Role('user')
    @Post()
    async setOrder(@GetUser() user, @Body() dto: OrderDTO){
        return await this.orderService.addOrder(user,dto);
    }

    @UseGuards(RolesGuard)
    @Role('user')
    @Patch(":id")
    async updateOrder(@GetUser() user, @Param('id') id:number, @Body()dto: UpdateOrderDTO){
        return await this.orderService.updateOrder(user, id, dto)
    }
    @UseGuards(RolesGuard)
    @Role('user')
    @Delete(":id")
    async deleteOrder(@GetUser() user, @Param('id') id: number){
        return await this.orderService.deleteOrder(user,id);
    }

    
    @Get(":id")
    async getOrder(@GetUser() user, @Param('id') id: number){
        return await this.orderService.getOrderById(user,id);
    }

    @Get("my-orders")
    async getMyOrders(@GetUser() user){
        return await this.orderService.getUserOrders(user);
    }

    @Get("all-orders")
    async getAllOrders(@GetUser() user){
        return await this.orderService.getAllOrders(user);
    }
}
