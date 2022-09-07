import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, UsersService } from 'src/users/users.service'

export const jwtConstants = {
  secret: 'secretKey',
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username)

    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
