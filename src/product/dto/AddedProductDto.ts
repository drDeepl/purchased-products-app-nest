import { ApiProperty } from '@nestjs/swagger';
import { BaseProductDto } from './BaseProductDto';

export class AddedProductDto extends BaseProductDto {
  @ApiProperty({ description: '', nullable: false })
  id: number;
}
