import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { postOrderDto } from "src/Dto/postOrder.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Ordenes')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService : OrdersService){}
    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    async getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ordersService.getOrder(id)
    }
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    async addOrder(@Body() order: postOrderDto){
        const {userId, products} = order
        return await this.ordersService.addOrder(userId, products)

    }
}