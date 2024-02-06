import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class BasePurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер продукта должен быть целым числом',
  })
  productId: number;
  @IsInt({
    message: 'количество должен быть целым числом',
  })
  count: number;
  @IsInt({
    message: 'номер единицы измерения должен быть целым числом',
  })
  unitMeasurementId: number;
  @IsNumber()
  price: number;
}
