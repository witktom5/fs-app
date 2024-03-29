import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entity/user.entity'
import { LoginRequestDto } from './dto/login-request.dto'
import { RegisterRequestDto } from './dto/register-request.dto'
import * as bcrypt from 'bcrypt'
import { instanceToPlain } from 'class-transformer'
import { JwtSign } from './auth.interface'
import { RequestUserInterface } from '../types/request-user.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registeRequestDto: RegisterRequestDto): Promise<void> {
    const { username, email, password } = registeRequestDto
    const salt = await bcrypt.genSalt(+this.configService.get('SALT_ROUNDS'))
    //  hash password
    const hashedPassword = await bcrypt.hash(password, salt)

    //  create user
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
    })
    await this.usersRepository.save(user)
  }

  async validateUser(loginRequestDto: LoginRequestDto): Promise<User | null> {
    const { username, password } = loginRequestDto
    const user = await this.usersRepository.findOne({ where: { username } })

    //  return authenticated user with password excluded
    if (user && (await bcrypt.compare(password, user.password))) {
      return new User(instanceToPlain(user))
    }
    return null
  }

  async loginUser(user: RequestUserInterface): Promise<JwtSign> {
    //  return token to user
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
