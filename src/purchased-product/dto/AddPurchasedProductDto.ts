import { IsInt } from 'class-validator';
import { BasePurchasedProductDto } from './BasePurchasedProductDto';
import { ApiProperty } from '@nestjs/swagger';
import { constructFrom } from 'date-fns';

export class AddPurchasedProductDto extends BasePurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'дата покупки должна быть в виде целого числа',
  })
  purchaseDate: EpochTimeStamp;

  constructor(
    productId: number,
    count: number,
    unitMeasurementId: number,
    price: number,
    purchaseDate: EpochTimeStamp,
  ) {
    super(productId, count, unitMeasurementId, price);
    this.purchaseDate = purchaseDate;
  }
}
