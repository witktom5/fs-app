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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registeRequestDto: RegisterRequestDto): Promise<void> {
    const { username, email, password } = registeRequestDto
    const salt = await bcrypt.genSalt(+(process.env.SALT_ROUNDS as string))
    //  hash password
    const hashedPassword = await bcrypt.hash(password, salt)

    //  create user
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
    })
    //  save user
    await this.usersRepository.save(user)
  }

  async validateUser(loginRequestDto: LoginRequestDto): Promise<User | null> {
    const { username, password } = loginRequestDto
    const user = await this.usersRepository.findOne({ where: { username } })

    //  if user exists and password match return user with password excluded
    if (user && (await bcrypt.compare(password, user.password))) {
      return new User(instanceToPlain(user))
    }
    return null
  }

  async loginUser(user: User): Promise<JwtSign> {
    //  return token to validated user
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
