import { IsNumber } from 'class-validator';
import { BasePurchasedProductDto } from './BasePurchasedProductDto';

export class AddPurchasedProductDto extends BasePurchasedProductDto {
  @IsNumber({})
  purchaseDate: EpochTimeStamp;
}
