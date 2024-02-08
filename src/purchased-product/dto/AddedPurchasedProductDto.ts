import { IsDate, IsInt, IsObject } from 'class-validator';
import { BasePurchasedProductDto } from './BasePurchasedProductDto';
import { ApiProperty } from '@nestjs/swagger';
import { AddedProductDto } from '@/product/dto/AddedProductDto';
import { AddedMeasurementUnitDto } from '@/measurement-unit/dto/AddedMeasurementUnitDto';

export class AddedPurchasedProductDto extends BasePurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер продукта должен быть целым числом',
  })
  id: number;

  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер пользователя должен быть целым числом',
  })
  userId: number;

  @ApiProperty({ description: '', nullable: false })
  @IsObject()
  product: AddedProductDto;

  @ApiProperty({ description: '', nullable: false })
  @IsObject()
  unitMeasurement: AddedMeasurementUnitDto;

  @ApiProperty({ description: '', nullable: false })
  @IsDate()
  purchaseDate: Date;

  constructor(
    id: number,
    product: AddedProductDto,
    count: number,
    unitMeasurement: AddedMeasurementUnitDto,
    price: number,
    userId: number,
    purchaseDate: Date,
  ) {
    super(count, price);
    this.id = id;
    this.product = product;
    this.unitMeasurement = unitMeasurement;
    this.userId = userId;
    this.purchaseDate = purchaseDate;
  }
}
