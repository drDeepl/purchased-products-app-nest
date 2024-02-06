import { Test, TestingModule } from '@nestjs/testing';
import { PurchasedProductController } from './purchased-product.controller';

describe('PurchasedProductController', () => {
  let controller: PurchasedProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasedProductController],
    }).compile();

    controller = module.get<PurchasedProductController>(PurchasedProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
