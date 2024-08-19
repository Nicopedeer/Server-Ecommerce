import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {config as dotenvConfig} from 'dotenv'
import { Role } from 'src/users/roles.enum';
dotenvConfig({path:'.env'})

const validateRequest = (req: Request) => {
    const authorizationHeader = req.headers['authorization']
    if(!authorizationHeader){
      return false
    }
    const auth = authorizationHeader.split(" ")[1]
     if(!auth){
      return false
    }
    const [email, password] = auth.split(':')
    if(!email || !password){
      return false
    }
    return true 
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const secret = process.env.SWT_SECRET
    try{
    if(!token){
      throw new UnauthorizedException('No existe token');
    }

    
    const user = this.jwtService.verify(token, { secret });
    if (!user) {
      throw new UnauthorizedException('Error en la validacion del token');
    }
    user.exp = new Date(user.exp * 1000)
    request.user = user
    user.roles = user.isAdmin ? [Role.admin] : [Role.user];
    return true
    
  }
  catch(error){
    throw new UnauthorizedException('Error en la validacion del token')
  }
  }
}