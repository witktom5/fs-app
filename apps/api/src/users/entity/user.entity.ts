import { Exclude } from 'class-transformer'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Exclude()
  @Column()
  password: string

  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}
