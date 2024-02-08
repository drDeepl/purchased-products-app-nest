import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dto/UserDto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  private readonly logger = new Logger('USERS.SERVICE');

  constructor(private prisma: PrismaService) {}

  async findUsers(): Promise<UserDto[]> {
    this.logger.verbose('findUsers');
    const users: UserDto[] = await this.prisma.user.findMany();
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
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async deleteUser(userId: number): Promise<string> {
    this.logger.verbose('deleteUser');
    return this.prisma.user
      .delete({ where: { id: userId } })
      .catch((error) => {
        this.logger.error(`name: ${error.name}\ncode: ${error.code}`);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == 'P2025') {
            throw new HttpException(
              'данного пользователя не существует',
              HttpStatus.FORBIDDEN,
            );
          }
          throw new HttpException(
            'произошла ошибка в работе базы данных',
            HttpStatus.BAD_GATEWAY,
          );
        } else {
          throw new HttpException(
            'что-то пошло не так',
            HttpStatus.BAD_GATEWAY,
          );
        }
      })
      .then(() => 'пользователь удален');
  }
}
