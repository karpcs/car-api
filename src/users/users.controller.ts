import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Post('createAdmin')
    createAdmin(){
        this.usersService.createAdmin()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers()
    }
}