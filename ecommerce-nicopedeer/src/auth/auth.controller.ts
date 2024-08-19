import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInCredentialsDto } from "src/Dto/signInCredentials.dto";
import { RemovePasswordInterceptor } from "src/interceptors/removePassword.interceptor";
import { createUserDto } from "src/Dto/createUser.dto";
import { hideAdminInterceptor } from "src/interceptors/hideAdmin.interceptor";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Autorizacion y Autenticacion')
@Controller('auth')

export class AuthController {
    constructor( private readonly authService: AuthService){}
    @ApiBearerAuth()
    @Get()
    getAuth(){
        return this.authService.getAuth()
    }
    @ApiBearerAuth()
    @Post('signup')
    @UseInterceptors(RemovePasswordInterceptor)
    @UseInterceptors(hideAdminInterceptor)
    async signUp(@Body() user: createUserDto){
        return await this.authService.signUp(user)
    }
    @ApiBearerAuth()
    @Post('signin')
    signIn(@Body() credentials: SignInCredentialsDto){

        return this.authService.signIn(credentials)
    }
}

