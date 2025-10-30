import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItemDto } from './dto/cart-item.dto';
import { CartDocument } from './entities/cart.entity';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() createCartDto: CreateCartDto):Promise<CartDocument> {
    return await this.cartService.create(createCartDto);
  }

  @Get(':userId/items')
  @HttpCode(200)
  async userCart(@Param('userId') userId: string):Promise<CartDocument> {
    return await this.cartService.userCart(userId);
  }
  
  @Patch(':userId/items/add')
  async addToCartItem(@Param('userId') userId:string, @Body() cartItemDto:CartItemDto):Promise<CartDocument> {
    return await this.cartService.addItemToCart(userId, cartItemDto)
  }
  
  @Patch(':userId/items/increase')
  async increaseItemQuantity(@Param('userId') userId: string, @Body('name') name: string):Promise<CartDocument> { 
    //because body get object so we must get a special field for example for name we must write name of field in body decorator
    return await this.cartService.increaseItemQuantity(userId, name);
  }

  @Patch(':userId/items/decrease')
  async decreaseItemQuantity(@Param('userId') userId: string,@Body('name') name: string):Promise<CartDocument> {
    return await this.cartService.decreaseItemQuantity(userId, name);
  }
  
  //this code is correct but is butter use name as parameter url for delete like below code
  // @Delete(':userId/items/delete')
  // async removeItemFromCart(@Param('userId') userId: string, @Body('name') name: string) {
  //   return await this.cartService.removeItemFromCart(userId, name);
  // }

  @Delete(':userId/items/:name')
  async removeItemFromCart(@Param('userId') userId: string, @Param('name') name: string):Promise<CartDocument> {
    return await this.cartService.removeItemFromCart(userId, name)
  }

  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
