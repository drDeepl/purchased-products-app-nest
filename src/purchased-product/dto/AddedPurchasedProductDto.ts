import { IsDate, IsInt } from 'class-validator';
import { BasePurchasedProductDto } from './BasePurchasedProductDto';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsDate()
  purchaseDate: Date;
}
