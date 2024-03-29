import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AddCategoryDto } from './dto/AddCategoryDto';
import { CategoryDto } from './dto/CategoryDto';
import { EditCategoryDto } from './dto/EditCategoryDto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AddProductDto } from './dto/AddProductDto';
import { AddedProductDto } from './dto/AddedProductDto';
import { EditProductDto } from './dto/EditProductDto';
import { PrintNameAndCodePrismaException } from '@/util/ExceptionUtils';
import { MessageException } from '@/util/MessageException';
import { MessageDto } from '@/dto/MessageDto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger('ProductService');
  private readonly msgException = new MessageException();

  async getProducts(): Promise<AddedProductDto[]> {
    this.logger.verbose('GET PRODUCTS');
    return this.prisma.product
      .findMany({
        orderBy: {
          id: 'desc',
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
      })
      .then((result: AddedProductDto[]) => result);
  }

  async addProduct(addProductDto: AddProductDto): Promise<AddedProductDto> {
    this.logger.verbose('ADD PRODUCT');

    return this.prisma.product
      .create({
        data: {
          name: addProductDto.name,
          categoryId: addProductDto.categoryId,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == 'P2002') {
            throw new HttpException(
              'продукт с таким названеим уже существует',
              HttpStatus.FORBIDDEN,
            );
          } else if (error.code == 'P2003') {
            throw new HttpException(
              'выбранной категории не существует',
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
      .then((result: AddedProductDto) => result);
  }

  async editProduct(
    productId: number,
    editProductDto: EditProductDto,
  ): Promise<AddedProductDto> {
    this.logger.verbose('EDIT PRODUCT');
    return this.prisma.product
      .update({
        data: {
          name: editProductDto.name,
          categoryId: editProductDto.categoryId,
        },
        where: {
          id: productId,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new HttpException(
              'выбранное имя уже существует',
              HttpStatus.BAD_REQUEST,
            );
          } else if (error.code === 'P2003') {
            throw new HttpException(
              'выбранной категории не существует',
              HttpStatus.BAD_REQUEST,
            );
          } else if (error.code === 'P2025') {
            throw new HttpException(
              'выбранного продукта не существует',
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          throw new HttpException(
            this.msgException.UnhandledError,
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: AddedProductDto) => result);
  }

  async deleteProductById(productId: number): Promise<MessageDto> {
    this.logger.verbose('DELETE PRODUCT BY ID');
    return this.prisma.product
      .delete({
        where: {
          id: productId,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error.code === 'P2025') {
          throw new HttpException(
            'выбранного продукта не существует',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            this.msgException.UnhandledError,
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then(() => new MessageDto('продукт успешно удален'));
  }

  async addCategory(addCategoryDto: AddCategoryDto): Promise<CategoryDto> {
    this.logger.verbose('ADD CATEGORY DTO');
    return this.prisma.category
      .create({
        data: {
          name: addCategoryDto.name,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error['code'] == 'P2002') {
            throw new HttpException(
              'категория с таким названием уже существует',
              HttpStatus.FORBIDDEN,
            );
          }
        } else {
          console.log(error);
          throw new HttpException(
            'непредвиденная ошибка',
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: AddedProductDto) => result);
  }

  async getCategories(): Promise<CategoryDto[]> {
    this.logger.verbose('GET CATEGORIES');
    return this.prisma.category.findMany();
  }

  async deleteCategory(categoryId: number): Promise<MessageDto> {
    this.logger.verbose('DELETE CATEGORY');

    return this.prisma.category
      .delete({
        where: {
          id: categoryId,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          throw new HttpException(
            'данной категории не существует',
            HttpStatus.NOT_FOUND,
          );
        } else {
          throw new HttpException(
            this.msgException.UnhandledError,
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then(() => new MessageDto('категория успешно удалена'));
  }

  async editCategory(
    categoryId: number,
    editCategoryDto: EditCategoryDto,
  ): Promise<CategoryDto> {
    this.logger.verbose('EDIT CATEGORY');
    return this.prisma.category
      .update({
        data: {
          name: editCategoryDto.name,
        },
        where: {
          id: categoryId,
        },
      })
      .catch((error) => {
        PrintNameAndCodePrismaException(error, this.logger);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new HttpException(
              'выбранное имя уже существует',
              HttpStatus.BAD_REQUEST,
            );
          } else if (error.code === 'P2003') {
            throw new HttpException(
              'выбранной категории не существует',
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          throw new HttpException(
            this.msgException.UnhandledError,
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then((result: CategoryDto) => result);
  }
}
