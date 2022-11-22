import { QueryFailedError } from 'typeorm'

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class TypeormInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // map typeorm errors to http errors
    return next.handle().pipe(
      catchError((exception: object) => {
        switch (exception.constructor) {
          // handled cases
          case QueryFailedError:
            const { driverError } = exception as QueryFailedError
            switch (driverError.code) {
              case '23505':
                return throwError(
                  () => new ConflictException(driverError.detail),
                )
              default:
                return throwError(
                  () =>
                    new InternalServerErrorException('Unknown server error'),
                )
            }

          default:
            return throwError(() => exception)
        }
      }),
    )
  }
}
