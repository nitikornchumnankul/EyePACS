import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findUsername(username)

        if(user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user
            return result
        }

        return null
    }

    async login(user: any): Promise<any> {
        const payload = { username: user.username, user_id: user.user_id }
        return {
            user_id: user.user_id,
            username: user.username,
            accessToken: this.jwtService.sign(payload)
        }
    }
}
