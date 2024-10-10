import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/schema/user.schema';
import { UserController } from './user.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:UserSchema.name,schema:UserModel}])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
