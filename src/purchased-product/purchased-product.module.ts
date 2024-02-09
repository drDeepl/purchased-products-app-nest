import { Module } from '@nestjs/common';
import { PurchasedProductService } from './purchased-product.service';
import { PurchasedProductController } from './purchased-product.controller';
import { MessageException } from '@/util/MessageException';

@Module({
  providers: [PurchasedProductService],
  controllers: [PurchasedProductController],
})
export class PurchasedProductModule {}
