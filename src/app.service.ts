import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStartScreen(): string {
    return 'Start screen';
  }
}
