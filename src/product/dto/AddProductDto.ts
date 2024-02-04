import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddProductDto {
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: '', nullable: false })
  @IsNumber()
  categoryId: number;
}
