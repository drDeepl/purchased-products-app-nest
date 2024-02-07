import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AddPurchasedProductDto } from './dto/AddPurchasedProductDto';
import { AddedPurchasedProductDto } from './dto/AddedPurchasedProductDto';
import { PrintNameAndCodePrismaException } from '@/util/ExceptionUtils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { fromUnixTime, formatISO } from 'date-fns';
import { EditPurchasedProductDto } from './dto/EditPurchasedProductDto';

@Injectable()
export class PurchasedProductService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger('PurchasedProductService');

  async getPurchasedProductsByUserId(
    userId: number,
  ): Promise<AddedPurchasedProductDto[]> {
    this.logger.verbose('GET PURCHASED PRODUCTS');
    return this.prisma.purchasedProduct
      .findMany({
        where: {
          userId: userId,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        throw new HttpException('что-то пошло не так', HttpStatus.BAD_GATEWAY);
      })
      .then((result: AddedPurchasedProductDto[]) => result);
  }

  async addPurchasedProduct(
    userId: number,
    addPurchasedProductDto: AddPurchasedProductDto,
  ): Promise<AddedPurchasedProductDto> {
    const date = fromUnixTime(addPurchasedProductDto.purchaseDate);
    return this.prisma.purchasedProduct
      .create({
        select: {
          userId: true,
          productId: true,
          count: true,
          unitMeasurementId: true,
          price: true,
          purchaseDate: true,
        },
        data: {
          userId: userId,
          productId: addPurchasedProductDto.productId,
          count: addPurchasedProductDto.count,
          unitMeasurementId: addPurchasedProductDto.unitMeasurementId,
          price: addPurchasedProductDto.price,
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
            'что-то пошло не так',
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: AddedPurchasedProductDto) => result);
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
            'что-то пошло не так',
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: AddedPurchasedProductDto) => result);
  }

  async deletePurchasedProductById(id: number) {
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
            'что-то пошло не так',
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result) => {});
  }
}
