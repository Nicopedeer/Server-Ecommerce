import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/entities/Products.entity";
import { Repository } from "typeorm";
import { CloudinaryRepository } from "./cloudinary.repository";

@Injectable()
export class CloudinaryService {
	constructor(
        private readonly cloudinaryRepository: CloudinaryRepository,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
    ) {}
    async uploadImage(id: string, file: Express.Multer.File){
        const product = await this.productsRepository.findOneBy({id: id})
        if(!product){
            throw new BadRequestException(`No existe el producto con el id:${id}`)
        }
        const response = await this.cloudinaryRepository.uploadImage(file);
        const update = await this.productsRepository.update({id: product.id}, {imgUrl: response.secure_url})
        const updatedProduct = await this.productsRepository.findOneBy({id:id})
        return updatedProduct
    }

}