import {IsString, IsNumber} from "class-validator"

export class CreateProductDto {
    @IsString()
    title: string;

    @IsString()
    explain: string;

    @IsString()
    image: string;

    @IsNumber()
    price: number;

    @IsNumber()
    rate: number;

    @IsString()
    category: string;
}
