import { Test, TestingModule } from '@nestjs/testing';
import { PurchasedProductService } from './purchased-product.service';

describe('PurchasedProductService', () => {
  let service: PurchasedProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasedProductService],
    }).compile();

    service = module.get<PurchasedProductService>(PurchasedProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
