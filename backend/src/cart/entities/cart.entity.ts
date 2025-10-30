import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

@Schema()
export class CartItem {
    @Prop()
    image: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop({default: 1})
    quantity: number;
}
export type CartItemDocument = HydratedDocument<CartItem>
const CartItemSchema = SchemaFactory.createForClass(CartItem);
CartItemSchema.virtual('imageUrl').get(function () {
    if(!this.image) return null;
    return `${process.env.BASE_URL}${this.image.startsWith('/') ? '' : '/'}${this.image}`
})


@Schema({timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}})
export class Cart {
    @Prop({type: mongoose.Schema.ObjectId, ref: 'User',required: true})
    userId: string;

    @Prop({type: [CartItemSchema], default: []}) 
    items: CartItem[];
}
export type CartDocument = HydratedDocument<Cart>
export const CartSchema = SchemaFactory.createForClass(Cart)