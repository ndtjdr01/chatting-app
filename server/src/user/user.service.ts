import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from 'src/schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserSchema.name) private userModel: Model<UserSchema>) { }
    
    
    async findById(id:string):Promise<any>{
        const user = await this.userModel.findById(id,{password:0})
        if(!user) throw new Error('user not found')
        return {message:'ok',data:user}
    }
}
