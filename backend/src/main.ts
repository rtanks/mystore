import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))

  app.enableCors({origin: true})

  //this part for local
  const port = process.env.PORT || 5000
  await app.listen(port);
  // console.log(`Backend listening on http://localhost:${port}`)
}
bootstrap();
