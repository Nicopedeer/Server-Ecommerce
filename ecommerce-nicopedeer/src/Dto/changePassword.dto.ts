import { IsNotEmpty, IsString, IsStrongPassword, Matches, Validate } from "class-validator"
import { MatchingPassword } from "src/decorators/matchingPasswords.decorator"

export class ChangePasswordDto{
    /**
     * Esta es la password actual del usuario
     * @example 'Password#123'
     */
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

     /**
     * Esta es la nueva password del usuario
     * @example 'Password#1234'
     */
    @IsString({ message: 'password debe ser un string' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'Password debe contener al menos una letra mayuscula, una letra minuscula, un numero, y un caracter especial (!@#$%^&*), debe ser de entre 8 y 15 caracteres de largo',
    })
    newPassword: string


    /**
     * Esta es la confirmacion de la nueva password del usuario
     * @example 'Password#1234'
     */
    @IsNotEmpty({ message: 'Confirmar la password' })
    @Validate(MatchingPassword, ['newPassword'])
    confirmNewPassword: string
}