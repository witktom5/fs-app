import { Injectable } from '@nestjs/common'
import { LoginRequestDto } from './dto/login-request.dto'

@Injectable()
export class AuthService {
  async validateUser(loginRequestDto: LoginRequestDto) {
    // todo validate user
    return null
  }
}
