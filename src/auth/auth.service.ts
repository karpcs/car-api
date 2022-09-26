import { Injectable, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'
import { NewUser } from 'src/users/users.types'

export const jwtConstants = {
  secret: 'secretKey',
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username)
    if (user && compareSync(password, user.password)) {

      const { password, ...result } = user
      return result
    }

    return null
  }

  async register(newUser: NewUser) {
    const user = await this.usersService.findOne(newUser.username)
    if (user) {
      throw new BadRequestException('username already exists')
    }

    if (newUser.password !== newUser.repeatPassword) {
      throw new BadRequestException('password does not match')
    }
    return this.usersService.createUser({ username: newUser.username, password: newUser.password, userInfo: null })

  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
