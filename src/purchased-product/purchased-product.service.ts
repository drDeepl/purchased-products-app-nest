import { MessageDto } from '@/dto/MessageDto';
import { PrismaService } from '@/prisma/prisma.service';
import { PrintNameAndCodePrismaException } from '@/util/ExceptionUtils';
import { MessageException } from '@/util/MessageException';
import { ZoneDateTimeUtil } from '@/util/ZoneDateTimeUtil';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { fromUnixTime } from 'date-fns';
import { AddPurchasedProductDto } from './dto/AddPurchasedProductDto';
import { AddedPurchasedProductDto } from './dto/AddedPurchasedProductDto';
import { EditPurchasedProductDto } from './dto/EditPurchasedProductDto';

@Injectable()
export class PurchasedProductService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger('PurchasedProductService');
  private readonly msgException = new MessageException();

  async getPurchasedProductsByUserId(
    userId: number,
  ): Promise<AddedPurchasedProductDto[]> {
    this.logger.verbose('GET PURCHASED PRODUCTS');
    return this.prisma.purchasedProduct
      .findMany({
        select: {
          id: true,
          userId: true,
          product: true,
          unitMeasurement: true,
          count: true,
          price: true,
          purchaseDate: true,
        },
        where: {
          userId: userId,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        throw new HttpException(
          this.msgException.UnhandledError,
          HttpStatus.BAD_GATEWAY,
        );
      })
      .then((result: AddedPurchasedProductDto[]) => result);
  }

  async getPurchasedProductByUserIdOnDate(userId: number, timestamp: number) {
    this.logger.verbose('GET PURCHASED PRODUCTS ON DATE BY USER ID');

    const zoneDateTimeUtil = new ZoneDateTimeUtil(timestamp);

    const startSelectedDay: string = zoneDateTimeUtil.getStartDay();
    const endSelectedDay: string = zoneDateTimeUtil.getEndDay();

    this.logger.verbose(
      `start of day${startSelectedDay}\nend of day: ${endSelectedDay}`,
    );

    return this.prisma.purchasedProduct
      .findMany({
        select: {
          id: true,
          product: true,
          count: true,
          unitMeasurement: true,
          price: true,
          userId: true,
          purchaseDate: true,
        },
        where: {
          userId: userId,
          purchaseDate: {
            lte: endSelectedDay,
            gte: startSelectedDay,
          },
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2003') {
            throw new HttpException(
              'неверный товар или единица измерения',
              HttpStatus.FORBIDDEN,
            );
          } else if (error.code === 'P2010') {
            throw new HttpException(
              'неверный формат даты',
              HttpStatus.FORBIDDEN,
            );
          }
        } else {
          throw new HttpException(
            this.msgException.UnhandledError,
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: AddedPurchasedProductDto[]) => result);
  }

  async addPurchasedProduct(
    userId: number,
    addPurchasedProductDto: AddPurchasedProductDto,
  ): Promise<AddedPurchasedProductDto> {
    const purchaseDate: string = new ZoneDateTimeUtil(
      addPurchasedProductDto.purchaseDate,
    ).toLocalString();
    return this.prisma.purchasedProduct
      .create({
        select: {
          id: true,
          product: true,
          count: true,
          unitMeasurement: true,
          price: true,
          userId: true,
          purchaseDate: true,
        },
        data: {
          userId: userId,
          productId: addPurchasedProductDto.productId,
          count: addPurchasedProductDto.count,
          unitMeasurementId: addPurchasedProductDto.unitMeasurementId,
          price: addPurchasedProductDto.price,
          purchaseDate: purchaseDate,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == 'P2010') {
            throw new HttpException(
              'неверный товар или единица измерения',
              HttpStatus.FORBIDDEN,
            );
          }
        } else {
          throw new HttpException(
            this.msgException.UnhandledError,
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: any) => result);
  }

  async editPurchasedProduct(
    purchasedProductId: number,
    editPurchasedProductDto: EditPurchasedProductDto,
  ): Promise<AddedPurchasedProductDto> {
    this.logger.verbose('EDIT PURCHASED PRODUCT');
    this.logger.debug(editPurchasedProductDto);
    const date = fromUnixTime(editPurchasedProductDto.purchaseDate);
    return this.prisma.purchasedProduct
      .update({
        select: {
          id: true,
          product: true,
          count: true,
          unitMeasurement: true,
          price: true,
          userId: true,
          purchaseDate: true,
        },
        where: { id: purchasedProductId },
        data: {
          userId: editPurchasedProductDto.userId,
          productId: editPurchasedProductDto.productId,
          count: editPurchasedProductDto.count,
          unitMeasurementId: editPurchasedProductDto.unitMeasurementId,
          price: editPurchasedProductDto.price,
          purchaseDate: date,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == 'P2003') {
            throw new HttpException(
              'неверный товар или единица измерения',
              HttpStatus.FORBIDDEN,
            );
          }
        } else {
          throw new HttpException(
            this.msgException.UnhandledError,
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: AddedPurchasedProductDto) => result);
  }

  async deletePurchasedProductById(id: number): Promise<MessageDto> {
    this.logger.verbose('DELETE PURCHASED PRODUCT BY ID');
    return this.prisma.purchasedProduct
      .delete({
        where: {
          id: id,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new HttpException(
              'выбранного товара не существует',
              HttpStatus.FORBIDDEN,
            );
          }
        } else {
          throw new HttpException(
            this.msgException.UnhandledError,
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result) => new MessageDto('запись успешно удалена'));
  }
}
