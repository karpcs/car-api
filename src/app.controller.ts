import { Controller, Get, Post, UseGuards, Request, Body, Req } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
import { User } from './users/users.entity'



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) { }

}
