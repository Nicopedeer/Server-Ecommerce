import { Controller, Get, Post, Param, Body, Delete, Put, HttpCode, UseGuards, Query, ParseUUIDPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { createProductDto } from "src/Dto/createProduct.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Products } from "src/entities/Products.entity";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/users/roles.enum";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateProductDto } from "src/Dto/updateProduct.dto";


@ApiTags('Productos')
@Controller('products')

export class ProductsController{
  constructor( private readonly productsService: ProductsService){}
  @ApiBearerAuth()
  @Get()
  async getProducts(@Query('page') page: string, @Query('limit') limit: string ){
    !page ? page = '1' : page;
    !limit ? limit = '5' : limit
      return await this.productsService.getProducts(Number(page), Number(limit))
  }
  @ApiBearerAuth()
  @Get('seeder')
  async preLoadData() {
    return await this.productsService.resetData() 
  }
  @ApiBearerAuth()
  @Get(':id')
    async getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.getProductById(id);
  }
  @ApiBearerAuth()
  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  async createProduct(@Body() product: createProductDto) {
    const productCreated = await this.productsService.createProduct(product);
    return productCreated
  }
  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(200)
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body()product : UpdateProductDto){
    return await this.productsService.updateProduct(id, product)
    
  }
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @Roles(Role.admin)
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string){
    return  await this.productsService.deleteProduct(id)
    
  }
}