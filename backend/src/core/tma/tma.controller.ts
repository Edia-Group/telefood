import { Controller, Post, Res } from '@nestjs/common';
import { TmaService } from './tma.service';
import { InitData } from '@tma.js/sdk';

/**
 * Implementation adapted from: https://docs.telegram-mini-apps.com/platform/authorizing-user.
 * The @Res() decorator injects the response object into the controller method.
 * res.locals: https://www.geeksforgeeks.org/express-js-res-locals-property/
 */

@Controller('tma')
export class TmaController {
  constructor(private readonly tmaService: TmaService) {}

  /**
   * Sets init data in the response object.
   * @param res - Response object.
   * @param initData - InitData object.
   */
  @Post()
  setInitData(@Res() res, initData: InitData): void {
    res.locals = { initData };
  }
}
