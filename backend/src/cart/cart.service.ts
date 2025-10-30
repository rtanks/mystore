import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument, CartItem } from './entities/cart.entity';
import { CartItemDto } from './dto/cart-item.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CartService {

  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>){}
  async create(createCartDto: CreateCartDto):Promise<CartDocument> {
    return await this.cartModel.create(createCartDto);
  }


  // async findAll() {
  //   return `This action returns all cart`;
  // }

  async userCart(userId: string):Promise<CartDocument> {
    const cart = await this.cartModel.findOne({userId:new Types.ObjectId(userId)}).exec();
    if(!cart) throw new NotFoundException('Not Found! 404');
    return cart;
  }

  async addItemToCart(userId: string, createItemDto:CartItemDto): Promise<CartDocument> {
    let cart = await this.cartModel.findOne({userId:new Types.ObjectId(userId)});
    if(!cart) throw new NotFoundException('Not Found! 404');
    // if(cart.items.length === 0) {
    //   cart.items = [{...createItemDto, quantity: 1}]
    // }
    const existingItem = cart.items.find(item => item.name === createItemDto.name)
    if(existingItem){
      existingItem.quantity += 1;  
    } else {
      cart.items.push(createItemDto as CartItem);
    }
    return cart.save();
  }

  async increaseItemQuantity (userId: string, name: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({userId:new Types.ObjectId(userId)});
    if(!cart) throw new NotFoundException('Not Found! 404')
    const existingItem = cart.items.find(item => item.name === name)
    if(existingItem) {
      existingItem.quantity += 1;
    }
    return cart.save();
  }

  async decreaseItemQuantity (userId: string, name: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({userId:new Types.ObjectId(userId)});
    if(!cart) throw new NotFoundException('Not Found! 404')
      
      const existingItem = cart.items.find(item => item.name === name)
      if(existingItem) {
        if(existingItem.quantity === 1) {
          cart.items = cart.items.filter(item => item.name !== name)
        } else {
          existingItem.quantity -= 1;
        }
      } else {
        throw new NotFoundException(`Item ${name} not found in cart`)
      }
    return cart.save();
  }

  async removeItemFromCart(userId : string, name : string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({userId:new Types.ObjectId(userId)});
    if(!cart) throw new NotFoundException('Not Found! 404')
    if(cart.items.find(item => item.name === name)) {
      cart.items = cart.items.filter(item => item.name !== name)
    } else {
      throw new NotFoundException(`Item ${name} not found in cart`)
    }
    return cart.save();
  }
  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cart`;
  // }
}
