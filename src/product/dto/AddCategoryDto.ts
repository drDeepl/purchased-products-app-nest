import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryDto {
  @ApiProperty({ description: '', nullable: false })
  name: string;
}