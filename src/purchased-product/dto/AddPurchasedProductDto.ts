import { IsInt } from 'class-validator';
import { BasePurchasedProductDto } from './BasePurchasedProductDto';
import { ApiProperty } from '@nestjs/swagger';

export class AddPurchasedProductDto extends BasePurchasedProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsInt({
    message: 'дата покупки должна быть в виде целого числа',
  })
  purchaseDate: EpochTimeStamp;
}
