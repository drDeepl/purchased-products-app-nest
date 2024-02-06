import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AddPurchasedProductDto } from './dto/AddPurchasedProductDto';
import { AddedPurchasedProductDto } from './dto/AddedPurchasedProductDto';
import { PrintNameAndCodePrismaException } from '@/util/ExceptionUtils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { fromUnixTime, formatISO } from 'date-fns';

@Injectable()
export class PurchasedProductService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger('PurchasedProductService');

  async addPurchasedProduct(
    userId: number,
    addPurchasedProductDto: AddPurchasedProductDto,
  ) {
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
      .then((result) => result);
  }
}
