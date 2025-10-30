import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entities/cart.entity';
import { CartListener } from './cart.listener';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Cart.name, schema: CartSchema}])
  ],
  controllers: [CartController],
  providers: [CartService, CartListener],
})
export class CartModule {}
