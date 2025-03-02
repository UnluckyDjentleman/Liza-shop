import { PartialType } from "@nestjs/mapped-types";
import { ProductDTO } from "./products.dto";
import { IsUUID } from "class-validator";

export class UpdateProductsDTO extends PartialType(ProductDTO){
    @IsUUID()
    id: string
}