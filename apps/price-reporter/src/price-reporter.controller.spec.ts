import { Test, TestingModule } from '@nestjs/testing';
import { PriceReporterController } from './price-reporter.controller';
import { PriceReporterService } from './price-reporter.service';

describe('PriceReporterController', () => {
  let priceReporterController: PriceReporterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PriceReporterController],
      providers: [PriceReporterService],
    }).compile();

    priceReporterController = app.get<PriceReporterController>(PriceReporterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(priceReporterController.getHello()).toBe('Hello World!');
    });
  });
});
