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
  @IsInt({
    message: 'номер продукта должен быть целым числом',
  })
  productId: number;

  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер еденицы измерения должен быть целым числом',
  })
  unitMeasurementId: number;

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
    super(count, price);
    this.productId = productId;
    this.unitMeasurementId = unitMeasurementId;
    this.userId = userId;
    this.purchaseDate = purchaseDate;
  }
}
