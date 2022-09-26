import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInfoService } from './user-info.service';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) { }

  @Get()
  getUserInfo() {
    return this.userInfoService.getAll()
  }

  @Post('update')
  async addUserInfo(@Body() body){
    return this.userInfoService.addUserInfo(body)
  }
}
