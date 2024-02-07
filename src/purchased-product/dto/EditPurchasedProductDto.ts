import { IsInt } from 'class-validator';
import { BasePurchasedProductDto } from './BasePurchasedProductDto';
import { ApiProperty } from '@nestjs/swagger';

export class EditPurchasedProductDto extends BasePurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер пользователя должен быть целым числом',
  })
  userId: number;

  @ApiProperty({ description: '', nullable: false })
  @IsInt()
  purchaseDate: EpochTimeStamp;

  constructor(
    productId: number,
    count: number,
    unitMeasurementId: number,
    price: number,
    userId: number,
    purchaseDate: EpochTimeStamp,
  ) {
    super(productId, count, unitMeasurementId, price);
    this.userId = userId;
    this.purchaseDate = purchaseDate;
  }
}
