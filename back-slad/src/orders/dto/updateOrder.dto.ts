import { PartialType } from "@nestjs/mapped-types";
import { OrderDTO } from "./order.dto";

export class UpdateOrderDTO extends PartialType(OrderDTO){}