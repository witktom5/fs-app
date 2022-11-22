import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}
