import { ApiProperty } from '@nestjs/swagger';
import { BaseCategoryDto } from './BaseCategoryDto';

export class CategoryDto extends BaseCategoryDto {
  @ApiProperty({ description: '', nullable: false })
  id: number;
}
