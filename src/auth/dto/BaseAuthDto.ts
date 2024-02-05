import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseAuthDto {
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty({
    message: 'имя пользователя не может быть пустым',
  })
  username: string;
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty({
    message: 'пароль не может быть пустым',
  })
  password: string;
}
