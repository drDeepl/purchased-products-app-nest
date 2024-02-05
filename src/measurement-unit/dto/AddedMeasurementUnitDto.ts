import { ApiProperty } from '@nestjs/swagger';
import { BaseMeasurementUnitDto } from './BaseMeasurementUnitDto';

export class AddedMeasurementUnitDto extends BaseMeasurementUnitDto {
  @ApiProperty({ description: '', nullable: false })
  id: number;
}
