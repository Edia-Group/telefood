import { Controller, Get, Post } from '@nestjs/common';
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

}
