import { ApiHideProperty } from "@nestjs/swagger"
import { IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, Validate, isEmpty } from "class-validator"
import { MatchingPassword } from "src/decorators/matchingPasswords.decorator"

export class createUserDto {
    
    /**
    *   Este es el nombre de usuario 
    *    @example 'Lionel'
    */

    @IsNotEmpty({message: 'Nombre requerido'})
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
    @IsString({ message: 'El nombre debe ser un string' })
    name: string

    /**
     * Este es el mail del usuario
     * @example 'lio10@example.com'
     */


    @IsEmail()
    @IsNotEmpty({message: 'Email requerido'})
    email: string

    /**
     * Esta es la password del usuario
     * @example 'Password#123'
     */

    @IsString({ message: 'password debe ser un string' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'Password debe contener al menos una letra mayuscula, una letra minuscula, un numero, y un caracter especial (!@#$%^&*), debe ser de entre 8 y 15 caracteres de largo',
    })
    password: string

    /**
     * Esta es la confirmacion de password del usuario
     * @example 'Password#123'
     */

    @IsNotEmpty({ message: 'Confirmar la password' })
    @Validate(MatchingPassword, ['password'])
    confirmPassword: string

    /**
     * Esta es la calle del usuario
     * @example 'Avenida Barcelona'
     */


    @IsNotEmpty({message: 'direccion requerida'})
    @Length(3, 80 )
    address: string

    /**
     * Este es el telefono del usuario
     * @example '123456789'
     */

    @IsNumber()
    @IsNotEmpty({message: 'telefono requerido'})
    phone: number 

     /**
     * Este es el pais del usuario
     * @example 'Argentina'
     */
    @IsNotEmpty({message: 'pais requerido'})
    @Length(4, 20)
    @IsString({ message: 'pais debe ser un string' })
    country: string

    /**
     * Esta es la ciudad del usuario
     * @example 'Rosario'
     */
    @IsNotEmpty({message: 'ciudad requerida'})
    @Length(5, 20)
    @IsString({ message: 'ciudad debe ser un string' })
    city: string

    /**
     * Esta es la fecha de nacimiento del usuario
     * @example '2003-09-02'
     */

    @IsNotEmpty({message: 'fecha de nacimiento requerida'})
    @IsDateString()
    birthDate: string

    @ApiHideProperty()
    @IsEmpty()
    isAdmin:boolean
}