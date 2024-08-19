import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as data from '../utils/data.json'
import { Categories } from "src/entities/Categories.entity";
import { CreateCategoryDto } from "src/Dto/createCategory.dto";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>
    ) {}

    async getCategories() {
        return await this.categoriesRepository.find();
    }

    async addCategories(){
        for (const element of data) {
            await this.categoriesRepository
                .createQueryBuilder()
                .insert()
                .into(Categories)
                .values({ name: element.category })
                .orIgnore()
                .execute();
        }
        
        return 'Categorías cargadas'
    }

    async createCategories(category: CreateCategoryDto){
        const name = category.name
        const exist = await this.categoriesRepository.findOne({where:{
            name : name
        }})
        if(exist){
            throw new BadRequestException(`Ya existe la categoria con el nombre: ${name}`)
        }
        const newCategory = new Categories()
        newCategory.name = name
        return await this.categoriesRepository.save(newCategory)
    }
}