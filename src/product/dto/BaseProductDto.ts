import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseProductDto {
  @IsNotEmpty({
    message: 'поле с названием продукта не может быть пустым',
  })
  @ApiProperty({ description: 'name product', nullable: false })
  name: string;

  @IsNotEmpty({
    message: 'поле с  категорией не может быть пустым',
  })
  @ApiProperty({ description: 'category product', nullable: false })
  categoryId: number;
}
