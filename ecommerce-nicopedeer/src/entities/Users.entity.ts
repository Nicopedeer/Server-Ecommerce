
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./Orders.entity";

@Entity({name:'USERS'})

export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 50, 
        unique: true,
        type: 'varchar',
        nullable: false,
    })
    email: string;

    @Column({ 
        length: 50,
        type: 'varchar',
        nullable: false, 
    })
    name: string;

    @Column({
        length: 130 ,
        type: 'varchar',
        nullable: false, 
    })
    password: string;  

    @Column({
        type: 'text', 
    })
    address: string

    @Column({
        type: 'bigint'
    })
    phone: number

    @Column({
        length: 20,
        type: 'varchar'
    })
    country?: string

    @Column({
        length: 20, 
        type: 'varchar'
    })
    city?: string

    @Column({
        type:'text'
    })
    birthDate: string

    @Column({
        default: false
    })
    isAdmin : boolean

    @OneToMany(() => Orders, order => order.user)
    @JoinColumn({name: 'order_id'})
    orders: Orders[]


}