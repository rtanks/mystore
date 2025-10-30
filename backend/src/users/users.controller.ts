import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe({whitelist: true}))
  async register(@Body() createUserDto: CreateUserDto):Promise<UserDocument> {
    return await this.usersService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body('email') email: string,@Body('password') password: string):Promise<Partial<UserDocument>> {
    const user = await this.usersService.login(email, password);
    const { password: _pass, ...result } = user;
    return result;
  }

  @Get(':id')
  async userInformation(@Param('id') id: string):Promise<Partial<UserDocument>> {
    return await this.usersService.userInformation(id);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // async login(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
