import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatModule,
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    AuthModule,
    UserModule,
    UploadModule
  ],
  providers:[AppService],
  controllers:[AppController]
})
export class AppModule {} 
