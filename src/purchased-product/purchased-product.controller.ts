import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PurchasedProductService } from './purchased-product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddedPurchasedProductDto } from './dto/AddedPurchasedProductDto';
import { AuthGuard } from '@nestjs/passport';
import { UserAccess } from '@/user/decorators/user.decorator';
import { AddPurchasedProductDto } from './dto/AddPurchasedProductDto';
import { BadRequestDto } from '@/dto/BadRequestDto';
import { SimpleRequestExceptionDto } from '@/dto/SimpleRequestExceptionDto';
import { EditPurchasedProductDto } from './dto/EditPurchasedProductDto';

@ApiTags('PurchasedProductController')
@UseGuards(AuthGuard('jwt'))
@Controller('api/purchased_product')
export class PurchasedProductController {
  private readonly logger = new Logger('PurchasedProductController.CONTROLLER');
  constructor(
    private readonly purchasedProductService: PurchasedProductService,
  ) {}

  @Get('/all/:userId')
  @ApiOperation({
    summary: 'получение списка купленных товаров, выбранного пользователя',
  })
  @ApiResponse({ status: HttpStatus.OK, type: AddedPurchasedProductDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: SimpleRequestExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async getPurchasedProductsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @UserAccess() userAccessData,
  ): Promise<AddedPurchasedProductDto[]> {
    this.logger.verbose('GET PURCHASED PRODUCTS');
    if (userAccessData.isAdmin || userAccessData.id === userId) {
      return this.purchasedProductService.getPurchasedProductsByUserId(userId);
    } else {
      throw new ForbiddenException('недостаточно прав');
    }
  }

  @Get('/date')
  @ApiOperation({
    summary: 'получение списка купленных товаров, выбранного пользователя',
  })
  @ApiResponse({ status: HttpStatus.OK, type: AddedPurchasedProductDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: SimpleRequestExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async getPurchasedProductsOnDateByUserId(
    @UserAccess() userAccessData,
    @Query('timestamp', ParseIntPipe) timestamp: number,
  ) {
    this.logger.verbose('GET PURCHASED PRODUCTS ON DATE BY USER ID');
    this.logger.verbose(`timestamp: ${timestamp}`);
    const userId = Number(userAccessData.id);
    return this.purchasedProductService.getPurchasedProductByUserIdOnDate(
      userId,
      timestamp,
    );
  }

  @Post('/add')
  @ApiOperation({ summary: 'добавление купленного товара' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '',
    type: AddedPurchasedProductDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: SimpleRequestExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async addPurchasedProduct(
    @UserAccess() userAccessData,
    @Body() addPurchasedProductDto: AddPurchasedProductDto,
  ): Promise<AddedPurchasedProductDto> {
    this.logger.verbose('ADD PURCHASED PRODUCT DTO');
    return this.purchasedProductService.addPurchasedProduct(
      userAccessData.id,
      addPurchasedProductDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/edit/:purchasedProductId')
  @ApiOperation({ summary: 'редактирование купленного товара' })
  @ApiResponse({ status: HttpStatus.OK, type: AddedPurchasedProductDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: SimpleRequestExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async editPurchasedProduct(
    @Param('purchasedProductId', ParseIntPipe) purchasedProductId: number,
    @UserAccess() userAccessData,
    @Body() editPurchasedProductDto: EditPurchasedProductDto,
  ) {
    this.logger.verbose('EDIT PURCHASED PRODUCT DTO');
    if (
      userAccessData.isAdmin ||
      editPurchasedProductDto.userId === userAccessData.id
    ) {
      return this.purchasedProductService.editPurchasedProduct(
        purchasedProductId,
        editPurchasedProductDto,
      );
    } else {
      throw new ForbiddenException('недостаточно прав');
    }
  }

  @Delete('/delete/:purchasedProductId')
  @ApiOperation({ summary: 'удаление купленного товара' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: SimpleRequestExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestDto,
  })
  async deletePurchasedProductById(
    @Param('purchasedProductId', ParseIntPipe) purchasedProductId,
  ) {
    this.logger.verbose('DELETE PURCHASED PRODUCT BY ID');
    return this.purchasedProductService.deletePurchasedProductById(
      purchasedProductId,
    );
  }
}
