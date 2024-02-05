import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddCategoryDto } from './dto/AddCategoryDto';
import { CategoryDto } from './dto/CategoryDto';
import { ProductService } from './product.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DontKnowExceptionMsg } from '@/util/MessageConstants';
import { Prisma } from '@prisma/client';

@ApiTags('ProductController')
@UseGuards(AuthGuard('jwt'))
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private readonly logger = new Logger('ProductController');

  @Post('category/add')
  @ApiOperation({ summary: 'добавление категории' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Есть пустые поля в теле запроса',
  })
  async addNewCategory(
    @Body() addCategory: AddCategoryDto,
  ): Promise<CategoryDto> {
    this.logger.verbose('ADD CATEGORY REQUEST');

    return await this.productService.addCategory(addCategory);
  }

  @Get('category/all')
  @ApiOperation({ summary: 'получение списка категорий' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CategoryDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findCategories(): Promise<CategoryDto[]> {
    this.logger.verbose('FIND CATEGORIES');
    return this.productService.getCategories();
  }

  @Delete('category/delete/:categoryId')
  @ApiOperation({ summary: 'удаление категории' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CategoryDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Unknow Error' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found category with current id',
  })
  async deleteCategoryById(@Param('categoryId') categoryId: number) {
    this.logger.verbose('DELETE CATEGORY');
    return this.productService.deleteCategory(Number(categoryId));
  }
}
