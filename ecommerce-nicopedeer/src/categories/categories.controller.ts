import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/users/roles.enum";
import { CreateCategoryDto } from "src/Dto/createCategory.dto";



@ApiTags('Categorias')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}
    @ApiBearerAuth()
    @Get('seeder')
    addCategories() {
        return this.categoriesService.addCategories()
    }
    @ApiBearerAuth()
    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(Role.admin)
    @Post('create')
    async createCategory(@Body() category: CreateCategoryDto){
        return await this.categoriesService.createCategory(category)
    }
    
}