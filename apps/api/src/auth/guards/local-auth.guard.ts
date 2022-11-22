import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    // check if both password and login are provided
    const body = context.switchToHttp().getRequest().body
    if (!body.email || !body.password) {
      throw new BadRequestException('Login or password not provided')
    }
    return super.canActivate(context)
  }
}
