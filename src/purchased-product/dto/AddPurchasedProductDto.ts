import { IsInt } from 'class-validator';
import { BasePurchasedProductDto } from './BasePurchasedProductDto';
import { ApiProperty } from '@nestjs/swagger';
import { constructFrom } from 'date-fns';

export class AddPurchasedProductDto extends BasePurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер продукта должен быть целым числом',
  })
  productId: number;

  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер единицы измерения должен быть целым числом',
  })
  unitMeasurementId: number;

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
    super(count, price);
    this.productId = productId;
    this.unitMeasurementId = unitMeasurementId;
    this.purchaseDate = purchaseDate;
  }
}
