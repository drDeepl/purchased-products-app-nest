import { IsDate, IsInt } from 'class-validator';
import { BasePurchasedProductDto } from './BasePurchasedProductDto';

export class AddedPurchasedProductDto extends BasePurchasedProductDto {
  @IsInt({
    message: 'номер продукта должен быть целым числом',
  })
  id: number;

  @IsDate()
  purchaseDate: Date;
}
