import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty({ description: '', nullable: false })
  message: string[];
  @ApiProperty({ description: '', nullable: false })
  error: string;
  @ApiProperty({ description: '', nullable: false })
  statusCode: number;
}
