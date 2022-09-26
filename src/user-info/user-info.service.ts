import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UserInfo } from './user-info.entity';

@Injectable()
export class UserInfoService {
    constructor(
        @InjectRepository(UserInfo)
        private userInfoRepository: Repository<UserInfo>,
        private usersService: UsersService,
    ) { }

    async addUserInfo(info: any){
        console.log(info)
        const user = await this.usersService.findOne(info.username)
        console.log(user)

        const userInfo = new UserInfo()
        userInfo.address = info.address
        const test = await this.userInfoRepository.save(userInfo)
        console.log("after userinfo save")
        user.userInfo = test
        console.log(user)
        await this.usersService.updateUser(user)
        return user
    }

    async getAll() {
        const userInfo = await this.userInfoRepository.find({
            select: {
                address: true,
            }
        })
        return userInfo
    }
}
