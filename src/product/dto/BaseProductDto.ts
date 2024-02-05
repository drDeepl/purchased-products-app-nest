import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty({
    message: 'поле с названием продукта не может быть пустым',
  })
  name: string;
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty({
    message: 'поле с  категорией не может быть пустым',
  })
  categoryId: number;
}
