import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AddCategoryDto } from './dto/AddCategoryDto';
import { CategoryDto } from './dto/CategoryDto';
import { EditCategoryDto } from './dto/EditCategoryDto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  constructor(private prisma: PrismaService) {}

  async addCategory(addCategoryDto: AddCategoryDto): Promise<CategoryDto> {
    this.logger.verbose('ADD CATEGORY DTO');
    return this.prisma.category.create({
      data: {
        name: addCategoryDto.name,
      },
    });
  }

  async getCategories(): Promise<CategoryDto[]> {
    this.logger.verbose('GET CATEGORIES');
    return this.prisma.category.findMany();
  }

  async deleteCategory(categoryId: number) {
    this.logger.verbose('DELETE CATEGORY');
    try {
      return this.prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          'данной категории не существует',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException('что-то пошло не так', HttpStatus.BAD_GATEWAY);
      }
    } finally {
      return;
    }
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
