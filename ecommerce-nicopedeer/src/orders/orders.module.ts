import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/OrderDetails.entity";
import { Orders } from "src/entities/Orders.entity";
import { Products } from "src/entities/Products.entity";
import { Users } from "src/entities/Users.entity";
import { OrdersRepository } from "./orders.repository";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Products, Users])],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository]
  })
  export class OrdersModule {}