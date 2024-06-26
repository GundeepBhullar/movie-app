import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            //create token
            return result;
        }
        return null;
    }

     // this function name is changed from login to generateToken.
    async generateToken(user: any) {
        const payload = { username: user.username, sub: user.userId};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
