import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { HttpException, HttpStatus } from '@nestjs/common';
const chalk = require('chalk');

/**
 * https://docs.nestjs.com/techniques/logger#logger
 */

@Injectable()
export class LoggingMiddlewareService implements NestMiddleware {
    private readonly logger = new Logger('HTTP');
  
    use(req: Request, res: Response, next: NextFunction) {
      const timestamp = new Date().toLocaleString();
      const method = req.method;
      const url = req.url;
  
      res.on('finish', () => {
        const status = res.statusCode;
        let message = `[${method}] [${status}] ${url} - ${timestamp}`;

        if (status >= HttpStatus.BAD_REQUEST) {
          message = chalk.red(message);
        } else if (status === HttpStatus.NOT_FOUND) {
          message = chalk.yellow(message);
        }
  
        this.logger.log(message);
      });
  
      next();
    }
  }