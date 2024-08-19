import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/entities/Products.entity";
import { Categories } from "src/entities/Categories.entity";
import { OrdersRepository } from "src/orders/orders.repository";
import { UsersRepository } from "src/users/users.repository";
import { Orders } from "src/entities/Orders.entity";
import { Users } from "src/entities/Users.entity";
import { OrderDetails } from "src/entities/OrderDetails.entity";
@Module({
    imports:[TypeOrmModule.forFeature([Products, Categories, Orders, Users, OrderDetails])],
    controllers:[ProductsController],
    providers:[ProductsService, ProductsRepository, OrdersRepository, UsersRepository]
})

export class ProductsModule {}