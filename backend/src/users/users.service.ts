import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument> , private eventEmitter:EventEmitter2){}

  async register(createUserDto:CreateUserDto):Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({email: createUserDto.email});
    if(existingUser) throw new BadRequestException("Email already registered")
      
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({...createUserDto, password: hashedPassword});
    this.eventEmitter.emit('user.created', {userId: user._id});
    return user;
  }

  async login(email: string, password: string):Promise<Partial<UserDocument>> {
    const user = await this.userModel.findOne({email}).exec();
    if(!user) throw new NotFoundException('User not found!');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new BadRequestException("Your email or password incorrect!");
    const {password: _pass, ...result} = user
    return result;
  }

  async userInformation(id: string):Promise<Partial<UserDocument>> {
    const user = await this.userModel.findById(id).exec();
    if(!user) throw new NotFoundException('Not found! 404');
    const {password: _pass, ...result} = user
    return result;
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
