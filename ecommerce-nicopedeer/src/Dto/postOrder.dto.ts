import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/entities/Products.entity";

export class postOrderDto{
    /**
     * Este es el ID del usuario que crea la orden
     * @example "Id de usuario"
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        description:'Este es el arreglo de id de productos',
        example:[{id: 'id'}, {id: 'id'}],
        type: [String],
        isArray:true
    })    
    @IsArray()
    @ArrayMinSize(1)
    products:[{
        id: string
    }]; 
}
