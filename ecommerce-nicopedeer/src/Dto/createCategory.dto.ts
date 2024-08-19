import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto{
    /**
     * Este es el nombre de la categoria
     * @example microphone
     */
    @IsNotEmpty()
    @IsString()
    name: string;
}