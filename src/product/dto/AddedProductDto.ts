import { ApiProperty } from '@nestjs/swagger';

export class AddedProductDto {
  @ApiProperty({ description: '', nullable: false })
  id: number;
  @ApiProperty({ description: '', nullable: false })
  name: string;
  @ApiProperty({ description: '', nullable: false })
  categoryId: number;
}
