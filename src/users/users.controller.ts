import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CrateUserDto } from './users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileLoadHelper } from '../utils/fileLoadHelper';
import { BadRequestException } from './users.exceptions';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: FileLoadHelper.destinationPath,
        filename: FileLoadHelper.uniqueFileName,
      }),
    }),
  )
  @ApiTags('users')
  create(
    @Body() user: CrateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let avatarSrc = user.avatar;
    if (avatar?.filename) {
      avatarSrc = `/${avatar.filename}`;
    }

    if (!avatarSrc) {
      throw new BadRequestException('noAvatar');
    }

    return this.usersService.create(user, avatarSrc);
  }
}
