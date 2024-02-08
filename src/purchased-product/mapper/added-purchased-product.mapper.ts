import { AddedPurchasedProductDto } from '../dto/AddedPurchasedProductDto';

export function addedPurchasedProductMapper(
  data: any,
): AddedPurchasedProductDto {
  return new AddedPurchasedProductDto(
    data['id'],
    data['product'],
    data['count'],
    data['unitMeasurement'],
    data['price'],
    data['userId'],
    data['purchaseDate'],
  );
}
