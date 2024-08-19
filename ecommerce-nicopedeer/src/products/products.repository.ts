import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createProductDto } from "src/Dto/createProduct.dto";
import { Categories } from "src/entities/Categories.entity";
import { Products } from "src/entities/Products.entity";
import { Repository } from "typeorm";
import * as data from '../utils/data.json'
import { Orders } from "src/entities/Orders.entity";
import e from "express";
import { UpdateProductDto } from "src/Dto/updateProduct.dto";

/*let products: Products[]= [
    {
        id: 1,
        name: "Zapatillas deportivas",
        description: "Zapatillas cómodas para correr o hacer ejercicio",
        price: 89.99,
        stock: true,
        imgUrl: "https://example.com/zapatillas.jpg",
    },
    {
        id: 2,
        name: "Camiseta de algodón",
        description: "Camiseta básica de manga corta",
        price: 19.99,
        stock: true,
        imgUrl: "https://example.com/camiseta.jpg",
    },
    {
        id: 3,
        name: "Reloj inteligente",
        description: "Reloj con funciones de seguimiento de actividad",
        price: 129.99,
        stock: false,
        imgUrl: "https://example.com/reloj.jpg",
    },
    {
        id: 4,
        name: "Bolso de cuero",
        description: "Bolso elegante para llevar tus pertenencias",
        price: 79.99,
        stock: true,
        imgUrl: "https://example.com/bolso.jpg",
    },
    {
        id: 5,
        name: "Gafas de sol",
        description: "Gafas con protección UV para el verano",
        price: 49.99,
        stock: true,
        imgUrl: "https://example.com/gafas.jpg",
    }
]*/

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Products) 
        private readonly productsRepository: Repository<Products>,
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
        @InjectRepository(Orders)
        private orderRepository: Repository<Orders>
    ) {}


    async getProducts(page: number, limit: number): Promise<Products[]> {
        let products = await this.productsRepository.find({
            relations: {
                category: true
            }
        })

        const start = ((page - 1) * limit)
        const end = start + limit

        products = products.slice(start, end)
        return await products
    }
    async getProductById(id: string): Promise<Products> {
        const productID = await this.productsRepository.findOne({where:{id:id}})
        if (!productID) {
            throw new BadRequestException(`No se encontró el producto con ID ${id} o no se pudo actualizar.`);
        }
        return productID

    }

    async createProduct(product: createProductDto) {
        const category = await this.categoriesRepository.findOne({
            where: { id: product.category }
        });
        if (!category) {
            throw new BadRequestException('Categoría no encontrada');
        }
        const newProduct = new Products();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.stock = product.stock;
        newProduct.imgUrl = product.imgUrl;
        newProduct.category = category;

        await this.productsRepository.save(newProduct)
        return newProduct
    }

    async preLoadData() {
        const categories = await this.categoriesRepository.find();
        for (const element of data) {
            const category = categories.find(cat => cat.name === element.category);
            const newProduct = new Products()
            newProduct.name = element.name
            newProduct.description = element.description
            newProduct.price = element.price
            newProduct.imgUrl = element.imgUrl
            newProduct.stock = element.stock
            newProduct.category = category
            await this.productsRepository
            .createQueryBuilder() // para crear la consulta SQL 
            .insert() // insercion de datos 
            .into(Products) // En esa entidad van los datos 
            .values(newProduct) // valor que va en entidad 
            .orIgnore() // no inserta si ya existe //? si ya existe se actualiza =>
            .execute()
        }            
       return "productos creados"      
    }

    async resetData (){
        const orders = await this.orderRepository.find()
        const product = await this.getProducts(1, 2000)
        if(orders.length === 0){
        for (const element of product) {
            await this.productsRepository.delete(element.id);
        }
          await this.preLoadData()
          return "Productos reiniciados"
        } else {
          throw new BadRequestException('No es posible reiniciar los datos, hay productos en uso')
        }
    
      }

    async updateProduct(id: string, product: Partial<UpdateProductDto>) {
        const existProduct = await this.productsRepository.findOneBy({id})
        if (!existProduct) {
            throw new BadRequestException('No existe producto con ese id')
        }
        const productUpdated = await this.productsRepository.update(id, product) 
        const updatedProduct = await this.productsRepository.findOneBy({id})
        return updatedProduct
    }

    async deleteProduct(id: string) {
        const orders = await this.orderRepository.find()
        if(orders.length === 0){
        const product = await this.getProductById(id)
        if(!product){
            throw new BadRequestException(`No se encontró el producto con ID ${id}`)
        }
        const result = await this.productsRepository.delete(id);
        return 'Producto eliminado';
        }
        else{
            throw new BadRequestException('No es posible eliminar el producto, ya que podria encontrarse en uso')
        }
    }
}
