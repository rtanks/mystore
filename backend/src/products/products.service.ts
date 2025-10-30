import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product, ProductDocument} from "./entities/product.entity"

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){}

  async create(createProductDto:CreateProductDto):Promise<ProductDocument> {
    const product = await this.productModel.create(createProductDto);
    return product.save();
  }

  async findAll():Promise<ProductDocument[]> {
    return this.productModel.find().sort({createAt: - 1}).exec()
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec()
    if(!product) throw new NotFoundException('Todo Not Found!')
    return product;
  }

  async update(id: string, updateProductDto:UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, updateProductDto).exec();
    if(!product) throw new NotFoundException('Todo Not Found!')
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id)
    if(!product) throw new NotFoundException('Todo Not Found!')
    return product;
  }
}
