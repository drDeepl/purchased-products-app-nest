import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AddCategoryDto } from './dto/AddCategoryDto';
import { CategoryDto } from './dto/CategoryDto';
import { EditCategoryDto } from './dto/EditCategoryDto';
import { ValidationError, isEmpty, validate } from 'class-validator';
import { EmptyFieldsException } from '@/exception/EmptyFieldsException';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DontKnowExceptionMsg } from '@/util/MessageConstants';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  constructor(private prisma: PrismaService) {}

  async addCategory(addCategoryDto: AddCategoryDto): Promise<CategoryDto> {
    this.logger.verbose('ADD CATEGORY DTO');
    if (isEmpty(addCategoryDto.name)) {
      throw new EmptyFieldsException('название категории не может быть пустым');
    }

    try {
      return await this.prisma.category.create({
        data: {
          name: addCategoryDto.name,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error['code'] == 'P2002') {
          throw new HttpException(
            'категория с таким названием уже существует',
            HttpStatus.FORBIDDEN,
          );
        }
      } else {
        console.log(error);
        throw new HttpException(DontKnowExceptionMsg, HttpStatus.BAD_GATEWAY);
      }
    }
  }

  async getCategories(): Promise<CategoryDto[]> {
    this.logger.verbose('GET CATEGORIES');
    return this.prisma.category.findMany();
  }

  async deleteCategory(categoryId: number) {
    this.logger.verbose('DELETE CATEGORY');

    return this.prisma.category
      .delete({
        where: {
          id: categoryId,
        },
      })
      .catch((error) => {
        this.logger.error(error);
        if (error instanceof PrismaClientKnownRequestError) {
          throw new HttpException(
            'данной категории не существует',
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

  async editCategory(
    editCategoryDto: EditCategoryDto,
    categoryId: number,
  ): Promise<CategoryDto> {
    this.logger.verbose('EDIT CATEGORY');
    return this.prisma.category.update({
      data: {
        name: editCategoryDto.name,
      },
      where: {
        id: categoryId,
      },
    });
  }
}
