import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class hideAdminInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          if (Array.isArray(data)) {
            return data.map((user) => {
              const { isAdmin,  ...userWithoutAdmin } = user;
              return isAdmin;
            });
          }
          else{
              if(!data)
                  return "No existe el usuario"
              else{
              const {isAdmin , ...userWithoutAdmin} = data
              return userWithoutAdmin
              }
          }
        }),
      );
    }
  }