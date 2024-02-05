import { Module } from '@nestjs/common';
import { MeasurementUnitController } from './measurement-unit.controller';
import { MeasurementUnitService } from './measurement-unit.service';

@Module({
  controllers: [MeasurementUnitController],
  providers: [MeasurementUnitService],
})
export class MeasurementUnitModule {}
