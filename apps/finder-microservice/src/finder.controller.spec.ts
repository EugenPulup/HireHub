import { Test, TestingModule } from '@nestjs/testing';
import { FinderController } from './finder.controller';
import { FinderService } from './finder.service';

describe('FinderController', () => {
  let finderController: FinderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FinderController],
      providers: [FinderService],
    }).compile();

    finderController = app.get<FinderController>(FinderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(finderController.getHello()).toBe('Hello World!');
    });
  });
});
