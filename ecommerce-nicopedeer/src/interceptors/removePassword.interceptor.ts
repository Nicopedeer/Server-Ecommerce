import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          });
        }
        else{
            if(!data)
                return "No existe el usuario"
            else{
            const {password , ...userWithoutPassword} = data
            return userWithoutPassword
            }
        }
      }),
    );
  }
}
