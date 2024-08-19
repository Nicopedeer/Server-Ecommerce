import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products/products.repository';
import { CategoriesRepository } from './categories/categories.repository';

@Injectable()
export class AppService{
  constructor(private categoriesRepository: CategoriesRepository,
    private productsRepository: ProductsRepository
  ){}
  

  async addCategories() {
      return await this.categoriesRepository.addCategories()
  }

  async preloadData(){
    return await this.productsRepository.preLoadData()
  }
}
