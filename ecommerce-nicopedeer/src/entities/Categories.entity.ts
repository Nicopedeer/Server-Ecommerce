import { Column, JoinColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./Products.entity";

@Entity({
    name: 'CATEGORIES'
})
export class Categories{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        length: 50, 
        type: 'varchar',
        nullable: false, 
        unique: true
    })
    name: string;

    @OneToMany(() => Products, product => product.category)
    @JoinColumn()
    products: Products[]
}