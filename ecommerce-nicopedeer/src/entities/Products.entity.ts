import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./OrderDetails.entity";
import { Categories } from "./Categories.entity";


@Entity({
    name: 'PRODUCTS'
})

export class Products{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        type: 'varchar',
        nullable: false, 
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'decimal', 
        precision: 10/*10 digitos*/, 
        scale: 2 /*2 decimales*/, 
        nullable: false
    })
    price: number;

    @Column('int')
    stock: number;

    @Column()
    imgUrl: string;

    @ManyToOne(() => Categories, category => category.products)
    @JoinColumn({name: 'category_id'})
    category: Categories

    @ManyToMany(() => OrderDetails, orderDetails => orderDetails.products)
    orderDetails: OrderDetails[]
}