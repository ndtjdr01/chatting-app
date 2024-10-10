import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
        private jwtService: JwtService
    ) { }
    async registerUser(password: string, username: string): Promise<any> {
        const user = await this.userModel.findOne({ username })
        if (user) throw new ConflictException('usernames already registered')
        if (password.length < 8) throw new UnprocessableEntityException('password must be at least 8 characters')
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new this.userModel({ username, password: hashedPassword })
        await newUser.save()
        return { message: 'ok', data: newUser }
    }
    async login(password: string, username: string): Promise<any> {
        const user = await this.userModel.findOne({ username })
        if (!user) throw new UnauthorizedException('not found user')
        if (!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException('password not match')
        const token = this.jwtService.sign({ username: user.username, userId: user._id })
        return { message: 'ok', token: token }
    }
    async getAllUsers(page: number, userId: any): Promise<any> {
        const skip = (page - 1) * 20
        const users = await this.userModel.find({ _id: { $ne: userId } }, { password: 0 }).skip(skip).limit(20).exec()
        return { message: 'ok', data: users }
    }
    // update info
    async updateUser(body: any, userId: string): Promise<any> {
        const { image, username } = body
        const user = await this.userModel.findByIdAndUpdate(userId, { image, username }, { new: true })
        if (!user) throw new Error('user not found')
        return { message: 'ok', data: user }
    }
    // get one user
    async getUser(userId: string): Promise<any> {
        const user = await this.userModel.findById(userId, { password: 0 })
        if (!user) throw new Error('user not found')
        return { message: 'ok', data: user }
    }
}
