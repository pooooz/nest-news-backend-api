import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from '../utils/crypto';
import { UsersEntity } from './users.entity';
import { CrateUserDto } from './users.dto';
import { Role } from './auth/role/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(user: CrateUserDto, avatarSrc: string) {
    const userEntity = new UsersEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.avatar = avatarSrc;
    userEntity.roles = user.role;
    userEntity.password = await hash(user.password);
    return await this.usersRepository.save(userEntity);
  }

  async findById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async setModerator(idUser: number) {
    const user = await this.findById(idUser);

    if (!user) {
      throw new UnauthorizedException();
    }
    user.roles = Role.Moderator;

    return this.usersRepository.save(user);
  }
}
