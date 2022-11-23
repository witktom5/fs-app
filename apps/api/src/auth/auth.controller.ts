import {
  Controller,
  Body,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common'
import { Request as ExpressReq } from 'express'
import { RegisterRequestDto } from './dto/register-request.dto'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtSign } from './auth.interface'
import { TypeormInterceptor } from '../interceptors/typeorm.interceptor'
import { RequestUserInterface } from '../types/request-user.interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(new TypeormInterceptor())
  @Post('/register')
  async registerUser(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<void> {
    await this.authService.registerUser(registerRequestDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Request() req: ExpressReq): Promise<JwtSign> {
    return this.authService.loginUser(req.user as RequestUserInterface)
  }
}
