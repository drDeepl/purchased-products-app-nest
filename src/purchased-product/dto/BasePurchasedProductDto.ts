import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class BasePurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsPositive({
    message: 'количество товара должно быть целым положительным числом',
  })
  count: number;

  @ApiProperty({ description: '', nullable: false })
  @IsNumber()
  price: number;

  constructor(count: number, price: number) {
    this.count = count;
    this.price = price;
  }
}
