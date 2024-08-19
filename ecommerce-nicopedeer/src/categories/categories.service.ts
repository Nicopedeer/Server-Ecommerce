import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from 'src/Dto/createCategory.dto';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    getCategories (){
        return this.categoriesRepository.getCategories()
    }

    addCategories (){
        return this.categoriesRepository.addCategories()
    }

    async createCategory(category: CreateCategoryDto){
        return await this.categoriesRepository.createCategories(category)
    }
}