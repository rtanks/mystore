import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from "@nestjs/mongoose"
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { EventEmitterModule } from '@nestjs/event-emitter';
import {ConfigModule} from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'upload'),
      serveRoot: '/upload'
    }),
    ProductsModule, CartModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
