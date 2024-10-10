import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class imageSchema{
    background:string;
    avatar:string;
}

@Schema()
export class UserSchema extends Document{
    @Prop({required: true,unique:true})
    username: string;
    @Prop({required: true})
    password: string;
    @Prop({default:{}})
    image: imageSchema;
}

export const UserModel = SchemaFactory.createForClass(UserSchema)