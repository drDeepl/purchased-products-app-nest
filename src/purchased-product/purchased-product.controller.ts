import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PurchasedProductService } from './purchased-product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddedPurchasedProductDto } from './dto/AddedPurchasedProductDto';
import { AuthGuard } from '@nestjs/passport';
import { UserAccess } from '@/user/decorators/user.decorator';
import { AddPurchasedProductDto } from './dto/AddPurchasedProductDto';

@ApiTags('PurchasedProductController')
@UseGuards(AuthGuard('jwt'))
@Controller('api/purchased_product')
export class PurchasedProductController {
  private readonly logger = new Logger('PurchasedProductController.CONTROLLER');
  constructor(
    private readonly purchasedProductService: PurchasedProductService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('add')
  @ApiOperation({ summary: 'запрос на вход' })
  @ApiResponse({ status: HttpStatus.OK, type: AddedPurchasedProductDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async addPurchasedProduct(
    @UserAccess() userAccessData,
    @Body() addPurchasedProductDto: AddPurchasedProductDto,
  ) {
    this.logger.verbose('ADD PURCHASED PRODUCT DTO');
    return this.purchasedProductService.addPurchasedProduct(
      userAccessData.sub,
      addPurchasedProductDto,
    );
  }
}
