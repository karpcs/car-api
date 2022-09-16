import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'
import { hashSync } from 'bcryptjs'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async createAdmin() {
    const adminUser = this.userRepository.create({
      password: hashSync('admin'),
      username: 'karolis'
    })
    return this.userRepository.save(adminUser)
  }

  async createUser(user: Omit<User, 'id'>){
    const newUser = this.userRepository.create({
      username: user.username,
      password: hashSync(user.password)
    })
    return this.userRepository.save(newUser)
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      username: ILike(username)
    })
    return user
  }

  async getAllUsers(): Promise<User[] | null> {
    const users = await this.userRepository.find({
      select: {
        username: true,
      }
    })
    console.log(users)
    return users
  }

}
