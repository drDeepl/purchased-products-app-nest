import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MeasurementUnitService } from './measurement-unit.service';
import { AddedMeasurementUnitDto } from './dto/AddedMeasurementUnitDto';
import { AddMeasurementUnitDto } from './dto/AddMeasurementUnitDto';
import { BadRequestDto } from '@/dto/BadRequestDto';
import { MessageDto } from '@/dto/MessageDto';

@ApiTags('MeasurementUnitController')
@UseGuards(AuthGuard('jwt'))
@Controller('api/measurement_unit')
export class MeasurementUnitController {
  constructor(
    private readonly measurementUnitService: MeasurementUnitService,
  ) {}

  private readonly logger = new Logger('MeasurementUnitController');

  @Post('/add')
  @ApiOperation({ summary: 'добавление единицы измерения' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AddedMeasurementUnitDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
    description: 'так же может быть из-за пустых полей в теле запроса',
  })
  async addMeasurementUnit(
    @Body() addMeasurementUnitDto: AddMeasurementUnitDto,
  ) {
    this.logger.verbose('ADD MEASUREMENT UNIT');
    await this.measurementUnitService.createMeasurementUnit(
      addMeasurementUnitDto,
    );
  }

  @Get('/all')
  @ApiOperation({ summary: 'получение всех едениц измерения' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AddedMeasurementUnitDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  async getMeasurementUnit(): Promise<AddedMeasurementUnitDto[]> {
    return this.measurementUnitService.getMeasurementUnits();
  }

  @Delete('/delete/:measurementUnitId')
  async deleteMeasurementUnitById(
    @Param('measurementUnitId') measurementUnitId: number,
  ): Promise<MessageDto> {
    return this.measurementUnitService.delete(Number(measurementUnitId));
  }
}
