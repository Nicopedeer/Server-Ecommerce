import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { postOrderDto } from "src/Dto/postOrder.dto";
import { OrderDetails } from "src/entities/OrderDetails.entity";
import { Orders } from "src/entities/Orders.entity";
import { Products } from "src/entities/Products.entity";
import { Users } from "src/entities/Users.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {}

    async addOrder(userId : string, products : any){
        let total = 0
        const user = await this.usersRepository.findOneBy({id: userId})
        if(!user){
            throw new NotFoundException(`No se encontro usuario con el id:${userId}`)
        }
        const newOrder = new Orders()
        newOrder.date = new Date()
        newOrder.user = user
        const orderSaved = await this.ordersRepository.save(newOrder)
        const productsArray = await Promise.all( 
        products.map(async(element)=>{
            const product = await this.productsRepository.findOneBy({
                id: element.id
            })
            if (!product) {
                throw new BadRequestException(`El producto con el id ${element.id} no existe`)
            }
            if (product.stock === 0) {
                throw new BadRequestException(`El producto con el id ${element.id} no tiene stock`)
            }
            total += Number(product.price)
            await this.productsRepository.update(
                {id: element.id},
                {stock: product.stock - 1}
            )
            return product
        }),   
        )
        const orderDetails = new OrderDetails()
        orderDetails.price = Number(Number(total).toFixed(2))//*=> 2 decimales 
        orderDetails.products = productsArray as Products[]
        orderDetails.orders = orderSaved
        await this.orderDetailsRepository.save(orderDetails)

        return await this.ordersRepository.find({
            where: {id: orderSaved.id},
            relations:{
                orderDetails: true 
            }
        })        
    }

    async getOrder(id: string){
        const order = await this.ordersRepository.findOne({
            where: {id},
            relations: {
                orderDetails: {
                    products: true
                }
            }
        })
        if(!order){
            return new BadRequestException(`No existe la orden con el Id:${id}`)
        }

        return order
    }
}