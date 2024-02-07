import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class BasePurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер продукта должен быть целым числом',
  })
  productId: number;

  @ApiProperty({ description: '', nullable: false })
  @IsPositive({
    message: 'количество товара должно быть целым положительным числом',
  })
  count: number;

  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер единицы измерения должен быть целым числом',
  })
  unitMeasurementId: number;

  @ApiProperty({ description: '', nullable: false })
  @IsNumber()
  price: number;

  constructor(
    productId: number,
    count: number,
    unitMeasurementId: number,
    price: number,
  ) {
    this.productId = productId;
    this.count = count;
    this.unitMeasurementId = unitMeasurementId;
    this.price = price;
  }
}
