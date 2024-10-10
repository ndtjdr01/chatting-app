import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatSchema } from 'src/schema/chat.schema';
import { UserSchema } from 'src/schema/user.schema';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(ChatSchema.name) private chatModel: Model<ChatSchema>,
        @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
    ) { }

    async createMessage(sender: string, receiver: string, message: string): Promise<any> {
        const messages = await this.chatModel.findOne({ participants: { $all: [sender, receiver], $size: 2 } })
        const user = await this.userModel.findById(sender)
        if(!user) throw new Error('sender not found')
        if (messages) {
            messages.messages.push({ message, sender, timestamp: new Date() })
            messages.lastUpdate = new Date()
            await messages.save()
            return {message,senderName:user.username}
        }
        else {
            const messages = new this.chatModel({
                participants: [sender, receiver],
                messages: [{ message, sender, timestamp: new Date() }],
                lastUpdate: new Date()
            })
            await messages.save()
            return {...messages,senderName: user.username}
        }
    }
    async getMessage(sender: string, receiver: string): Promise<any> {
        const message = await this.chatModel.findOne({
            participants: { $all: [sender, receiver], $size: 2 }
        }).select('messages').exec()
        if (!message) {
            return []
        }
        const result = await Promise.all(message['messages'].map(async(message) => {
            const user = await this.userModel.findById(message.sender)
            return ({ ...message, senderName: user.username })
        }))
        return result;
    }
    async deleteMessages(sender: string, receiver: string): Promise<void> {
        await this.chatModel.findOneAndUpdate({ participants: { $all: [sender, receiver] } },
            {
                $set: { messages: [], lastUpdate: new Date() }
            },
            { new: true }
        ).exec()
    }
}
