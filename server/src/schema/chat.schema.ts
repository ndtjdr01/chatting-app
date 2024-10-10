import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class MessageSchema{
    @Prop({required: true})
    sender: string;
    @Prop({required: true})
    message: string;
    @Prop({default:Date.now})
    timestamp:Date;
}
@Schema()
export class ChatSchema extends Document {
    @Prop({ required: true })
    participants: string[];
    @Prop({ required: true })
    messages: MessageSchema[];
    @Prop({ default: Date.now })
    lastUpdate: Date;  
}

export const ChatModel = SchemaFactory.createForClass(ChatSchema)