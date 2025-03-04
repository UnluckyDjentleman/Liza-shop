import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
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
        await this.orderService.addOrder(user,dto);
    }

    @UseGuards(RolesGuard)
    @Role('user')
    @Patch(":id")
    async updateOrder(@GetUser() user, @Param() id:number, @Body()dto: UpdateOrderDTO){
        await this.orderService.updateOrder(user, id, dto)
    }
    @UseGuards(RolesGuard)
    @Role('user')
    @Delete(":id")
    async deleteOrder(@GetUser() user, @Param() id: number){
        await this.orderService.deleteOrder(user,id);
    }
}
