import { PartialType } from "@nestjs/mapped-types";
import { ProductDTO } from "./products.dto";

export class ProdQueryDto extends PartialType(ProductDTO){}