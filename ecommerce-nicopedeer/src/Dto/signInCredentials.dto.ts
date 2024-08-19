import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class SignInCredentialsDto{
    /**
     * Este es el mail del usuario
     * @example 'lio10@example.com'
     */
    @IsEmail()
    @IsNotEmpty()
    email: string
    /**
     * Esta es la password del usuario
     * @example 'Password#123'
     */
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}