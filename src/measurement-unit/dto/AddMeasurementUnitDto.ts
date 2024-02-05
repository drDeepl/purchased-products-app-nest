import { ApiProperty } from '@nestjs/swagger';

export class AddMeasurementUnitDto {
  @ApiProperty({ description: '', nullable: false })
  name: string;
}
