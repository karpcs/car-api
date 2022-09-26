import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/users/user.entity";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.strategy";

type LocalStretegyRequest = Request & { user: Omit<User, 'password'> }

@Controller('auth')
export class AuthContoller {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
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