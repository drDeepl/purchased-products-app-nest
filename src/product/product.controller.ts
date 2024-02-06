import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddCategoryDto } from './dto/AddCategoryDto';
import { CategoryDto } from './dto/CategoryDto';
import { ProductService } from './product.service';
import { AddProductDto } from './dto/AddProductDto';
import { AddedProductDto } from './dto/AddedProductDto';
import { BadRequestDto } from '@/dto/BadRequestDto';
import { EditProductDto } from './dto/EditProductDto';
import { EditCategoryDto } from './dto/EditCategoryDto';

@ApiTags('ProductController')
@UseGuards(AuthGuard('jwt'))
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private readonly logger = new Logger('ProductController');

  @Get('all')
  @ApiOperation({ summary: 'получение списка продуктов' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [AddedProductDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async getProducts(): Promise<AddedProductDto[]> {
    this.logger.verbose('GET PRODUCTS');
    return this.productService.getProducts();
  }

  @Post('add')
  @ApiOperation({ summary: 'добавление продукта' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async addProduct(
    @Body() addProductDto: AddProductDto,
  ): Promise<AddedProductDto> {
    this.logger.verbose('ADD PRODUCT');
    return this.productService.addProduct(addProductDto);
  }

  @Post('edit/:productId')
  @ApiOperation({ summary: 'добавление продукта' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AddedProductDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async editProduct(
    @Body() editProductDto: EditProductDto,
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<AddedProductDto> {
    this.logger.verbose('ADD PRODUCT');
    return this.productService.editProduct(productId, editProductDto);
  }

  @Delete('delete/:productId')
  @ApiOperation({ summary: 'удаление продукта' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async deleteProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<string> {
    this.logger.verbose('DELETE PRODUCT BY Id');
    return this.productService.deleteProductById(productId);
  }

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
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
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
    type: CategoryDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  findCategories(): Promise<CategoryDto[]> {
    this.logger.verbose('FIND CATEGORIES');
    return this.productService.getCategories();
  }

  @Put('category/edit/:categoryId')
  @ApiOperation({ summary: 'редактирование категории' })
  @ApiResponse({
    status: HttpStatus.OK,

    type: CategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async editCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() editCategoryDto: EditCategoryDto,
  ): Promise<CategoryDto> {
    this.logger.error('EDIT CATEGORY');
    return this.productService.editCategory(categoryId, editCategoryDto);
  }

  @Delete('category/delete/:categoryId')
  @ApiOperation({ summary: 'удаление категории' })
  @ApiResponse({
    status: HttpStatus.OK,

    type: CategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async deleteCategoryById(@Param('categoryId') categoryId: number) {
    this.logger.verbose('DELETE CATEGORY');
    return this.productService.deleteCategory(Number(categoryId));
  }
}
