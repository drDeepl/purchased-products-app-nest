import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { AddedPurchasedProductDto } from './AddedPurchasedProductDto';

export class PurchasedProductDto extends AddedPurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'номер пользователя должен быть целым числом',
  })
  userId: number;
}
