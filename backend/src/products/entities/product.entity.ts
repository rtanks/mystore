import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {HydratedDocument} from "mongoose"

@Schema({
    timestamps: true, 
    toJSON:{virtuals: true}, 
    toObject:{virtuals: true}
})
export class Product {
    @Prop()
    title: string;

    @Prop()
    explain: string;

    @Prop()
    image: string;

    @Prop()
    price: number;

    @Prop()
    rate: number;

    @Prop()
    category: string;
}

export type ProductDocument = HydratedDocument<Product>;
const SchemaProduct = SchemaFactory.createForClass(Product);
SchemaProduct.virtual('imageUrl').get(function (){
    if(!this.image) return null;
    return `${process.env.BASE_URL}${this.image}`
})
export { SchemaProduct }