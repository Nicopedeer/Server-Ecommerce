import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersRepository } from "src/users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/Users.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    controllers:[AuthController],
    providers:[AuthService, UsersRepository],
})

export class AuthModule {}