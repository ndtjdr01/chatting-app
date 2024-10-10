import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[AuthModule,
    MongooseModule.forFeature([{name:UserSchema.name,schema:UserModel}])
  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {} 
