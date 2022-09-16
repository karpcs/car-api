import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/users/users.entity";
import { AuthService } from "./auth.service";

type LocalStretegyRequest = Request & { user: Omit<User, 'password'> }

@Controller('auth')
export class AuthContoller {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: LocalStretegyRequest) {
        console.log(req.user)
        return this.authService.login(req.user)
    }

    @Post('register')
    async register(@Body() body) {
        return this.authService.register(body)
    }
}