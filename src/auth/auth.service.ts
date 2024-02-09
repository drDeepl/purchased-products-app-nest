import { PrismaService } from '@/prisma/prisma.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Tokens } from './types';
import { PrintNameAndCodePrismaException } from '@/util/ExceptionUtils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MessageException } from '@/util/MessageException';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  private readonly msgException = new MessageException();
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: number,
    username: string,
    isAdmin: boolean,
  ): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          sub: username,
          isAdmin,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_EXP'),
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          sub: username,
          isAdmin,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXP'),
        },
      ),
    ]);
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async updateHashRefreshToken(userId: number, refreshToken: string) {
    this.logger.verbose('updateRefreshToken');
    const hashData: string = await this.hashData(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: hashData,
      },
    });
  }

  async signUp(dto: SignUpDto): Promise<Tokens> {
    this.logger.verbose('signUp');
    try {
      const hashData = await this.hashData(dto.password);
      const newUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          passwordHash: hashData,
          isAdmin: false,
        },
      });
      const tokens = await this.getTokens(
        newUser.id,
        newUser.username,
        newUser.isAdmin,
      );
      this.updateHashRefreshToken(newUser.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      PrintNameAndCodePrismaException(error, this.logger);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new HttpException(
            'пользователь с таким именем уже существует',
            HttpStatus.FORBIDDEN,
          );
        }
        throw new HttpException(
          'произошла ошибка в работе базы данных',
          HttpStatus.BAD_GATEWAY,
        );
      } else {
        throw new HttpException(
          this.msgException.UnhandledError,
          HttpStatus.BAD_GATEWAY,
        );
      }
    }
  }

  async signIn(dto: SignInDto): Promise<Tokens> {
    this.logger.verbose('signIn');

    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });
    if (!user) {
      throw new NotFoundException('данного пользователя не существует');
    }
    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('неверный пароль');
    }
    const tokens = await this.getTokens(user.id, user.username, user.isAdmin);
    this.updateHashRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    this.logger.verbose('logout');
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: null,
      },
    });
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    this.logger.verbose('refreshTokens');

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(user);
    if (!user) {
      throw new ForbiddenException('Пользователь не найден');
    }

    if (!user.refreshTokenHash) {
      throw new ForbiddenException('Refresh Token не найден');
    }

    const comparedRefreshToken = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );
    if (!comparedRefreshToken) {
      throw new ForbiddenException('Не соответствие токена');
    }

    const tokens = await this.getTokens(user.id, user.username, user.isAdmin);
    this.updateHashRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }
}
