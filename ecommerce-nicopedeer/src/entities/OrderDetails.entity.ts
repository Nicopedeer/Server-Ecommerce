import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./Orders.entity";
import { Products } from "./Products.entity";

@Entity({name: 'ORDER_DETAILS'})

export class OrderDetails{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type:'decimal', precision: 10, scale: 2 })
    price: number;

    @OneToOne(() => Orders, orders => orders.orderDetails)
    @JoinColumn({name: 'orders_id'})
    orders: Orders

    @ManyToMany(() => Products, product => product.orderDetails)
    @JoinTable({
        name: 'ORDERDETAILS_PRODUCTS',
        joinColumn: {
            name: 'orderDetails_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'products_id',
            referencedColumnName: 'id' //Especifica la columna de la entidad 
        }
    })
    products: Products[]


}