import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CrateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CrateUserDto) {
    return this.usersService.create(user);
  }
}
