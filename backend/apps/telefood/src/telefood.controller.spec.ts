import { Test, TestingModule } from '@nestjs/testing';
import { TelefoodController } from './telefood.controller';
import { TelefoodService } from './telefood.service';

describe('TelefoodController', () => {
  let telefoodController: TelefoodController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TelefoodController],
      providers: [TelefoodService],
    }).compile();

    telefoodController = app.get<TelefoodController>(TelefoodController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(telefoodController.getHello()).toBe('Hello World!');
    });
  });
});
