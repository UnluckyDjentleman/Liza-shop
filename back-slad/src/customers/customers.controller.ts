import { Body, Controller, Post, UseGuards, Put, Get, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import RolesGuard from 'src/auth/guard/role.guard';
import { CustomerDTO } from './dto/customer.dto';
import { Role } from 'src/auth/decorator/role.decorator';
import { CustomersService } from './customers.service';
import { UpdateCustomerDTO } from './dto/updateCustomer.dto';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {

    constructor(private customerService: CustomersService){}
    
    @UseGuards(RolesGuard)
    @Role('admin')
    @Post()
    async addCustomer(@Body() dto: CustomerDTO){
        return await this.customerService.createCustomer(dto);
    }

    @UseGuards(RolesGuard)
    @Role('admin')
    @Put(':id')
    async updateACustomer(@Param() id: string, @Body() dto: UpdateCustomerDTO){
        return await this.customerService.updateCustomer(id, dto)
    }

    @UseGuards(RolesGuard)
    @Role('admin')
    @Delete(":id")
    async deleteCustomer(@Param() id: string){
        return await this.customerService.deleteConsumer(id);
    }
}
