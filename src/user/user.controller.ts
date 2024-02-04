import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { UserAccess } from './decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { User } from './entites/user.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('api/user')
export class UserController {
  private readonly logger = new Logger('USERS.CONTROLLER');

  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: 'get current user info' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found user' })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  getCurrentUserInfo(@UserAccess() userAccess): Promise<UserDto> {
    this.logger.verbose('GET CURRENT USER INFO');
    const userId = userAccess.sub;
    return this.userService.findById(userId);
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found user' })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  findUserById(@Param('userId') userId: number): Promise<UserDto> {
    this.logger.verbose('findUserById');
    return this.userService.findById(userId);
  }

  @Delete('/:userId')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found user' })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  deleteUser(@Param('userId') userId: string) {
    this.logger.verbose('deleteUser');
    return this.userService.deleteUser(Number(userId));
  }
}
