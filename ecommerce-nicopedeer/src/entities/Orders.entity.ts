import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, OneToOne } from "typeorm";
import { Users } from "./Users.entity";
import { OrderDetails } from "./OrderDetails.entity";

@Entity({name:'ORDERS'})




export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Users, user => user.orders)
    @JoinColumn({name: 'user_id'})
    user: Users

    @Column()
    date: Date;

    @OneToOne(() => OrderDetails, orderDetails => orderDetails.orders)
    orderDetails: OrderDetails
}