// import { PrismaService } from '@/prisma/prisma.service';

import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entites/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('USERS.SERVICE');

  constructor(private prisma: PrismaService) {}

  async findUsers(): Promise<User[]> {
    this.logger.verbose('findUsers');
    const users: User[] = await this.prisma.user.findMany();
    return users;
  }

  async findById(userId: number): Promise<UserDto> {
    this.logger.verbose('findById');

    const user: UserDto = await this.prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async deleteUser(userId: number) {
    this.logger.verbose('deleteUser');
    try {
      return await this.prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}