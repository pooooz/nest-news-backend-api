import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from './users.entity';
import { CrateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(user: CrateUserDto) {
    const userEntity = new UsersEntity();
    userEntity.username = user.username;
    userEntity.email = user.email;
    return await this.usersRepository.save(userEntity);
  }
}
