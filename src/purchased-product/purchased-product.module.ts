import { Module } from '@nestjs/common';
import { PurchasedProductService } from './purchased-product.service';
import { PurchasedProductController } from './purchased-product.controller';

@Module({
  providers: [PurchasedProductService],
  controllers: [PurchasedProductController]
})
export class PurchasedProductModule {}
