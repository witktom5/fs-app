import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { User } from '../../users/entity/user.entity'
import { LoginRequestDto } from '../dto/login-request.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({
      username,
      password,
    } as LoginRequestDto)
    if (!user) throw new UnauthorizedException('Incorrect username or password')
    return user
  }
}
