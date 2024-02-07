import { isDataView } from 'util/types';
import { AddedPurchasedProductDto } from '../dto/AddedPurchasedProductDto';

export function addedPurchasedProductMapper(
  data: any,
): AddedPurchasedProductDto {
  return new AddedPurchasedProductDto(
    data['id'],
    data['product_id'],
    data['count'],
    data['unit_measurement_id'],
    data['price'],
    data['user_id'],
    data['purchase_date'],
  );
}
