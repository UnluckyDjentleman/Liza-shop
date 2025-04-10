import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { ProdQueryDto } from './dto/prodQuery.dto';
import { ProductsService } from './products.service';
import RolesGuard from 'src/auth/guard/role.guard';
import { ProductDTO } from './dto/products.dto';
import { Role } from 'src/auth/decorator/role.decorator';
import { UpdateProductsDTO } from './dto/updateProduct.dto';

//@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}
    @Get()
    async getProductsWithFilters(@Query() prodQuery: ProdQueryDto){
        return await this.productService.getProducts(prodQuery);
    }

    @Get(":id")
    async getProductById(@Param('id') id: string){
        return await this.productService.getProductById(id);
    }

    @UseGuards(RolesGuard)
    @Role('admin')
    @Post()
    async createNewProduct(@Body() body: ProductDTO){
        return await this.productService.createProduct(body);
    }

    @UseGuards(RolesGuard)
    @Role('admin')
    @Patch()
    @Put(":id")
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductsDTO){
        return await this.productService.updateProduct(id, body);
    }
    @UseGuards(RolesGuard)
    @Role('admin')
    @Delete(":id")
    async deleteProduct(@Param('id') id: string){
        return await this.productService.deleteProduct(id);
    }
}
