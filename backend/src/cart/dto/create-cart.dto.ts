import { Type } from "class-transformer";
import { IsString, IsArray, ValidateNested } from "class-validator";
import { CartItemDto } from "./cart-item.dto";

export class CreateCartDto {
    @IsString()
    userId: string;

    @IsArray()
    @ValidateNested({each: true})// each : true this means this validation apply for each member of array
    @Type(() => CartItemDto)
    items: CartItemDto[];
}
