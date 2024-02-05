import { ApiProperty } from '@nestjs/swagger';

export class AddedMeasurementUnitDto {
  @ApiProperty({ description: '', nullable: false })
  id: number;
  @ApiProperty({ description: '', nullable: false })
  name: string;
}
