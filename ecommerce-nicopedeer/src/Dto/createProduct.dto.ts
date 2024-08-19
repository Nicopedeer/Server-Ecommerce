import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"


export class createProductDto{
    /**
     * Esta es la categoria del producto
     * @example 'id de la categoria'
     */
    @IsNotEmpty()
    @IsUUID()
    category: string

    /**
     * Este es el nombre del producto
     * @example 'Monitor Samsung Lf27t350fhlxzx'
     */
    @IsNotEmpty()
    @IsString()
    name: string


    /**
     * Esta es la descipcion del producto
     * @example '27 Ips Full Hd 75hz Freesync'
     */

    @IsNotEmpty()
    @IsString()
    description: string

    /**
     * Este es el precio del producto
     * @example '210'
     */
    @IsNotEmpty()
    @IsNumber()
    price: number

    /**
     * Este es el stock del producto
     * @example '27'
     */
    @IsNotEmpty()
    @IsNumber()
    stock: number

    /**
     * Esta es la imagen del producto
     * @example 'https://images.fravega.com/f500/393cba5a66fe2d29273ed1e7244f3e60.jpg'
     */
    @IsNotEmpty()
    @IsString()
    imgUrl: string
}