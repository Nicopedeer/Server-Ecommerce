import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { createProductDto } from "src/Dto/createProduct.dto";
import { Products } from "src/entities/Products.entity";
import { UpdateProductDto } from "src/Dto/updateProduct.dto";

@Injectable()

export class ProductsService{
    constructor( private readonly productsRepository: ProductsRepository){}
    async getProducts(page: number, limit: number){
        return await this.productsRepository.getProducts(page, limit)
    }
    async getProductById( id : string){
        return await this.productsRepository.getProductById(id)
      }
    
     async createProduct(product: createProductDto){
        return  await this.productsRepository.createProduct(product)
      }

      async resetData(){
        return await this.productsRepository.resetData()
      }
      async preLoadData() {
        return await this.productsRepository.preLoadData()
      }
    
      async updateProduct(id: string, product: Partial<UpdateProductDto>){
        return await this.productsRepository.updateProduct(id, product)
      }
    
      async deleteProduct(id: string){
        return await this.productsRepository.deleteProduct(id)
      }
}
