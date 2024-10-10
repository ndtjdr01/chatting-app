import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModel, ChatSchema } from 'src/schema/chat.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserModel, UserSchema } from 'src/schema/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: ChatSchema.name, schema: ChatModel }
        , { name: UserSchema.name, schema: UserModel }]),
        AuthModule],
    providers: [ChatGateway, ChatService],
})
export class ChatModule { }
