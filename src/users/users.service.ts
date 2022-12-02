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
    userEntity.name = user.name;
    userEntity.email = user.email;
    return await this.usersRepository.save(userEntity);
  }

  async findById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
