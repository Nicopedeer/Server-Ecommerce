import { IsDecimal, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"
import { IsNull } from "typeorm"

export class UpdateProductDto{
    /**
     * Este es el nombre del producto
     * @example 'Monitor Samsung Lf27t350fhlxzx'
     */
    @IsOptional()
    @IsString()
    name: string


    /**
     * Esta es la descipcion del producto
     * @example '27 Ips Full Hd 75hz Freesync'
     */

    @IsOptional()
    @IsString()
    description: string

    /**
     * Este es el precio del producto
     * @example '210'
     */
    @IsOptional()
    @IsDecimal()
    price: number

    /**
     * Este es el stock del producto
     * @example '27'
     */
    @IsOptional()
    @IsNumber()
    stock: number

    /**
     * Esta es la imagen del producto
     * @example 'https://images.fravega.com/f500/393cba5a66fe2d29273ed1e7244f3e60.jpg'
     */
    @IsOptional()
    @IsString()
    imgUrl: string
}