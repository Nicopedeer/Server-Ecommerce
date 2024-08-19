import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChangePasswordDto } from "src/Dto/changePassword.dto";
import { createUserDto } from "src/Dto/createUser.dto";
import { SignInCredentialsDto } from "src/Dto/signInCredentials.dto";
import { Users } from "src/entities/Users.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { updateUserDto } from "src/Dto/updateUser.dto";
import { Orders } from "src/entities/Orders.entity";

/*let users: Users[] = [
    {
        id: 1,
        email: 'user1@example.com',
        name: 'John Doe',
        password: 'secretpassword',
        address: '123 Main St',
        phone: '555-123-4567',
        country: 'United States',
        city: 'New York',
    },
    {
        id: 2,
        email: 'user2@example.com',
        name: 'Jane Smith',
        password: 'anotherpassword',
        address: '456 Elm St',
        phone: '555-987-6543',
        country: 'Canada',
        city: 'Toronto',
    },
    {
        id: 3,
        email: 'user3@example.com',
        name: 'María Rodríguez',
        password: 'securepass123',
        address: '789 Oak St',
        phone: '555-555-7890',
        country: 'México',
        city: 'Ciudad de México',
    },
    {
        id: 4,
        email: 'user4@example.com',
        name: 'Carlos Pérez',
        password: 'mysecretword',
        address: '567 Maple Ave',
        phone: '555-987-6543',
        country: 'España',
        city: 'Madrid',
    },
    {
        id: 5,
        email: 'user5@example.com',
        name: 'Laura García',
        password: 'password123',
        address: '123 Elm St',
        phone: '555-123-4567',
        country: 'Argentina',
        city: 'Buenos Aires',
    },
    {
        id: 6,
        email: 'user6@example.com',
        name: 'Pedro Martínez',
        password: 'contraseñasegura',
        address: '789 Calle Principal',
        phone: '555-555-1234',
        country: 'España',
        city: 'Barcelona',
    },
    {
        id: 7,
        email: 'user7@example.com',
        name: 'Ana López',
        password: 'miclaveprivada',
        address: '456 Avenida Central',
        phone: '555-987-3210',
        country: 'México',
        city: 'Guadalajara',
    }
]*/

@Injectable()
export class UsersRepository{

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ){}
    
    async getUsers(page: number, limit: number) {
        const start = (page - 1) * limit
        const users = await this.usersRepository.find({
            take: limit,
            skip: start
        })

        return users
    }

     async getUserById(id:string){
        const user = await this.usersRepository.findOneBy({id})
        if(!user){
            throw  new BadRequestException(`usuario con ID ${id} no fue encontrado.`)
        }
        return user
            
    }

    async createUser(user: Partial<Users>){
        const saveUser = await this.usersRepository.save(user)
        const dbUser = await this.usersRepository.findOneBy({id: saveUser.id})
        return  dbUser
    }

    async updateUser(id: string, user: Partial<updateUserDto>){
        const updateResult = await this.usersRepository.update(id, user);
        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el usuario con ID ${id} o no se pudo actualizar.`);
        }

        const updatedUser = await this.usersRepository.findOneBy({ id });
        if (!updatedUser) {
            throw new BadRequestException(`No se encontró el usuario con ID ${id} después de la actualización.`);
        }

        return updatedUser
    }

    async updatePassword( id: string, credentials: ChangePasswordDto){
        const {password, newPassword} = credentials
        const user = await this.getUserById(id)
        if(!user){
            throw new BadRequestException(`No se encontro el usuario con id:${id}`)
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            throw new BadRequestException('Credenciales incorrectas')
        }
        user.password = await bcrypt.hash(newPassword, 10)
        const userUpdated =await this.usersRepository.update(id, user)

        return await this.getUserById(id)
    }

    async deleteUser(id: string){
        const user = await this.usersRepository.findOne({where:{id:id}, relations:{orders:true}})
        if(user.orders.length > 0)
        throw new BadRequestException('No se puede eliminar el usuario, posee ordenes asociadas')
        else{
            const userDeleted = this.usersRepository.delete({id})
            return ("Usuario borrado exitosamente")
        }
    }

    async getUserByEmail(email : string){
        const user = await this.usersRepository.findOneBy({email})
        return user
    }
}