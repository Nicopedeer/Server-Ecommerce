import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeOrm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import {config as dotenvConfig} from 'dotenv'
import { CategoriesRepository } from './categories/categories.repository';
import { ProductsRepository } from './products/products.repository';
import { OrdersRepository } from './orders/orders.repository';
import { UsersRepository } from './users/users.repository';
import { Users } from './entities/Users.entity';
import { OrderDetails } from './entities/OrderDetails.entity';
import { Orders } from './entities/Orders.entity';
import { Categories } from './entities/Categories.entity';
import { Products } from './entities/Products.entity';
dotenvConfig({path:'.env'})


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load: [typeOrmConfig]

  }),
  TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(configservie :ConfigService) => configservie.get('typeorm')
  }),UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, CloudinaryModule,JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60m' },
  }),TypeOrmModule.forFeature([Products, Categories, Orders, OrderDetails, Users])
],
  controllers: [AppController],
  providers: [AppService, CategoriesRepository,ProductsRepository,OrdersRepository, UsersRepository],
})
export class AppModule {}
