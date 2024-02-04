import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditCategoryDto {
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty()
  name: string;
}
