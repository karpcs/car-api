import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
    ){}

    async createAdmin(){
      const adminUser = this.userRepository.create({
        password: 'admin',
        username: 'karolis'
      })
      return this.userRepository.save(adminUser)
    }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      username: username
    })
    return user
  }

  async getAllUsers(): Promise<User[] | null> {
    const users = await this.userRepository.find()
    return users
  }

}
