import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/jwt.strategy";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('createAdmin')
    createAdmin() {
        this.usersService.createAdmin()
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers()
    }
}