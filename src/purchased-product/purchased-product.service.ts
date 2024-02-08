import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AddPurchasedProductDto } from './dto/AddPurchasedProductDto';
import { AddedPurchasedProductDto } from './dto/AddedPurchasedProductDto';
import { PrintNameAndCodePrismaException } from '@/util/ExceptionUtils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { fromUnixTime } from 'date-fns';
import { EditPurchasedProductDto } from './dto/EditPurchasedProductDto';
import { addedPurchasedProductMapper } from './mapper/added-purchased-product.mapper';

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
        throw new HttpException('что-то пошло не так', HttpStatus.BAD_GATEWAY);
      })
      .then((result: AddedPurchasedProductDto[]) => result);
  }

  async getPurchasedProductByUserIdOnDate(userId: number, timestamp: number) {
    this.logger.verbose('GET PURCHASED PRODUCTS ON DATE BY USER ID');
    const isoStringDate: string = fromUnixTime(timestamp).toISOString();
    return this.prisma.$queryRaw<
      AddedPurchasedProductDto[]
    >`SELECT * FROM purchased_products WHERE DATE(purchase_date) = DATE(${isoStringDate}) AND user_id = ${userId}`
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
            'что-то пошло не так',
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
    return this.prisma.purchasedProduct
      .create({
        data: {
          userId: userId,
          productId: addPurchasedProductDto.productId,
          count: addPurchasedProductDto.count,
          unitMeasurementId: addPurchasedProductDto.unitMeasurementId,
          price: addPurchasedProductDto.price,
          purchaseDate: fromUnixTime(addPurchasedProductDto.purchaseDate),
        },
        include: {
          product: true,
          unitMeasurement: true,
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
            'что-то пошло не так',
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: any) => addedPurchasedProductMapper(result));
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
      .then((result) => addedPurchasedProductMapper(result));
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
