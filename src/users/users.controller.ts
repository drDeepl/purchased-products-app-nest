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
import { User } from './entites/user.entity';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger('USERS.CONTROLLER');

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [User] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll(): Promise<User[]> {
    this.logger.verbose('users.controller: users findAll');
    return this.usersService.findUsers();
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found user' })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  findUserById(@Param('userId') userId: number): Promise<User> {
    this.logger.verbose('findUserById');
    return this.usersService.findById(userId);
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
    return this.usersService.deleteUser(Number(userId));
  }
}
