import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AddMeasurementUnitDto } from './dto/AddMeasurementUnitDto';
import { isEmpty } from 'class-validator';
import { EmptyFieldsException } from '@/exception/EmptyFieldsException';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DontKnowExceptionMsg } from '@/util/MessageConstants';
import { AddedMeasurementUnitDto } from './dto/AddedMeasurementUnitDto';

@Injectable()
export class MeasurementUnitService {
  private readonly logger = new Logger('MeasurementUnitService');

  constructor(private prisma: PrismaService) {}

  async createMeasurementUnit(addMeasurementUnitDto: AddMeasurementUnitDto) {
    this.logger.verbose('CREATE MEASUREMENT UNIT DTO');
    if (isEmpty(addMeasurementUnitDto.name)) {
      throw new EmptyFieldsException(
        'название единицы измерения не может быть пустым',
      );
    }

    return this.prisma.measurementUnit
      .create({
        data: {
          name: addMeasurementUnitDto.name,
        },
      })
      .catch((error) => {
        this.logger.error(error);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error['code'] == 'P2002') {
            throw new HttpException(
              'еденица измерения с таким названием уже существует',
              HttpStatus.FORBIDDEN,
            );
          }
        } else {
          console.log(error);
          throw new HttpException(DontKnowExceptionMsg, HttpStatus.BAD_GATEWAY);
        }
      });
  }

  async getMeasurementUnits(): Promise<AddedMeasurementUnitDto[]> {
    this.logger.verbose('GET MEASUREMENT UNIT');

    return this.prisma.measurementUnit.findMany().catch((error) => {
      this.logger.error(error);
      throw new HttpException(DontKnowExceptionMsg, HttpStatus.BAD_GATEWAY);
    });
  }

  async delete(measurementUnitId: number) {
    this.logger.verbose('DELETE MEASUREMENT UNIT');
    return this.prisma.measurementUnit
      .delete({
        where: {
          id: measurementUnitId,
        },
      })
      .catch((error) => {
        this.logger.error(error);
        if (error instanceof PrismaClientKnownRequestError) {
          throw new HttpException(
            'данной единицы измерения не существует',
            HttpStatus.NOT_FOUND,
          );
        } else {
          throw new HttpException(
            'что-то пошло не так',
            HttpStatus.BAD_GATEWAY,
          );
        }
      });
  }
}
