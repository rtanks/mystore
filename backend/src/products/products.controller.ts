import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productsService.create(createProductDto);
      return product;
    } catch(error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get()
  async findAll() {
    try {
      let product = await this.productsService.findAll();
      // product = product.map(item => item.image = `http://localhost:5000${item.image}`)
      return product;
    } catch(error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(id);
      return {status: "success", product: product};
    } catch (error) {
      if(error && NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException("Failed to fetch products!");
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productsService.update(id, updateProductDto);
      return product;
    } catch(error) {
      if(error && NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException("Failed to fetch product!");
    }
  }

  @Delete(':id')
  async remove(@Param('id') id : string) {
    try {
      const product = await this.productsService.remove(id);
      return {status: "success", product: product};
    } catch(error) {
      if(error && NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException("Failed to delete product!")
    }
  } 
}
