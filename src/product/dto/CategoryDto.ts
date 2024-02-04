import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ description: '', nullable: false })
  id: number;
  @ApiProperty({ description: '', nullable: false })
  name: string;
}
