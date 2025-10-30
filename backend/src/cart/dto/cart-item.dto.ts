import { IsString, IsArray, IsNumber, IsOptional } from "class-validator";

export class CartItemDto {
    @IsString()
    image: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    @IsOptional()
    quantity?: number;
}