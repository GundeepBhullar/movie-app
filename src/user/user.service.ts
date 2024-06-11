import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User>{
        const user = new User();
        user.username = createUserDto.username;
        user.password = await bcrypt.hash(createUserDto.password, 10);
        return this.usersRepository.save(user);
    }

    async findOne(username: string): Promise<User | undefined> {  //findOne where is this function used
        return this.usersRepository.findOne({where: {username}});
    }
}
