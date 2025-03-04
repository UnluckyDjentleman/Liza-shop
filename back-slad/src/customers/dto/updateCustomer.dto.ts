import { PartialType } from "@nestjs/mapped-types";
import { CustomerDTO } from "./customer.dto";

export class UpdateCustomerDTO extends PartialType(CustomerDTO){}