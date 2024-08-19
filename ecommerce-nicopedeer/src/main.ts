import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('Proyecto Integrador M-4 Back FT-50, servidor E-Commerce')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  app.use(loggerMiddleware)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
  }))
  await app.listen(3000);
}
bootstrap();
