import { Optional } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema()
export class User {
    @Prop()
    userName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phoneNumber: string;

    // @Prop()
    // address: string;

    // @Prop()
    // city: string;

    // @Prop()
    // province: string;
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)