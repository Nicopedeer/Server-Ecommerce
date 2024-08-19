import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator"

export class updateUserDto { 
    

    /**
    *   Este es el nombre de usuario 
    *    @example 'Lionel'
    */
    @IsOptional()
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
    @IsString({ message: 'El nombre debe ser un string' })
    name: string

    /**
     * Este es el mail del usuario
     * @example 'lio10@example.com'
     */
    @IsEmail()
    @IsOptional()
    email: string

    /**
     * Esta es la calle del usuario
     * @example 'Avenida Barcelona'
     */
    @IsOptional()
    @Length(3, 80 )
    address: string
    /**
     * Este es el telefono del usuario
     * @example '123456789'
     */

    @IsNumber()
    @IsOptional()
    phone: number 

    /**
     * Este es el pais del usuario
     * @example 'Argentina'
     */
    @IsOptional()
    @Length(4, 20)
    @IsString({ message: 'pais debe ser un string' })
    country: string

    /**
     * Esta es la ciudad del usuario
     * @example 'Rosario'
     */
    @IsOptional()
    @Length(5, 20)
    @IsString({ message: 'ciudad debe ser un string' })
    city: string
}