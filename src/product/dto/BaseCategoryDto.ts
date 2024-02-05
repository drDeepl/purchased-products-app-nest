import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseCategoryDto {
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty({
    message: 'название категории не может быть пустым',
  })
  name: string;
}
