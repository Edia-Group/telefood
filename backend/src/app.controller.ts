import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
  type Response,
} from 'express';

import { validate, parse } from '@tma.js/init-data-node';
import { InitData } from '@tma.js/sdk';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  receiveInitData(@Headers('Authorization') authHeader: string): string {
    if (!authHeader) {
      return 'Error: Authorization header is missing';
    }
    const token = authHeader.split(' ')[1];

    return `Success! initData received. Auth token: ${token}`;
  }


}
