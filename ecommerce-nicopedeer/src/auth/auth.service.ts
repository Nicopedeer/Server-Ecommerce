import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { createUserDto } from "src/Dto/createUser.dto";
import { SignInCredentialsDto } from "src/Dto/signInCredentials.dto";
import { UsersRepository } from "src/users/users.repository";

@Injectable()

export class AuthService{
    constructor(private readonly usersRepository: UsersRepository,
                private readonly jwtService: JwtService){}
    getAuth():string{
        return 'listado de auth'
    }

    async signUp(user: createUserDto){
        const {email, password} = user
        const userEmail = await this.usersRepository.getUserByEmail(email)
        if(userEmail){
            throw new BadRequestException('El email ya esta registrado')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        return await this.usersRepository.createUser({...user, password: hashedPassword})
    }

    async signIn(credentials: SignInCredentialsDto){
        const {email, password} = credentials
        const user = await this.usersRepository.getUserByEmail(email)
        if(!user){
            throw new BadRequestException('Credenciales incorrectas')
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            throw new BadRequestException('Credenciales incorrectas')
        }
        const payload = {id: user.id, email: user.email, isAdmin : user.isAdmin}
        const token =  this.jwtService.sign(payload)
        return {
            message: 'Sesion iniciada correctamente',
            token
        }

    }
}