import { Injectable } from '@nestjs/common';

@Injectable()
export class TelefoodService {
  getHello(): string {
    return 'Hello World!';
  }
}
