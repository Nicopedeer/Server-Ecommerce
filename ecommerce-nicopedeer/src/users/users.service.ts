import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { createUserDto } from "src/Dto/createUser.dto";
import { ChangePasswordDto } from "src/Dto/changePassword.dto";
import { updateUserDto } from "src/Dto/updateUser.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}
  async getUsers(page:number, limit:number) {
    return await this.usersRepository.getUsers(page, limit);
  }

  async getUserById( id : string){
    return await this.usersRepository.getUserById(id)
  }

   //async createUser(user){
    //return await this.usersRepository.createUser(user)
  //}

  async updateUser(id: string, user: Partial<updateUserDto>){
    return  await this.usersRepository.updateUser(id, user)
  }

  async updatePassword( id: string, credentials: ChangePasswordDto){
    return await this.usersRepository.updatePassword(id, credentials)
  }

  async deleteUser(id: string){
    return  await this.usersRepository.deleteUser(id)
  }
}