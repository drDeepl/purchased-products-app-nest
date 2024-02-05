import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseMeasurementUnitDto {
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty({
    message: 'поле с названием единицы измерения не может быть пустым',
  })
  name: string;
}
