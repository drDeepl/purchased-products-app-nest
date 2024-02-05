import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseMeasurementUnitDto } from './BaseMeasurementUnitDto';

export class AddMeasurementUnitDto extends BaseMeasurementUnitDto {}
