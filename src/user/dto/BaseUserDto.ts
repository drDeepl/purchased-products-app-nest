import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseUserDto {
  @ApiProperty({ description: '', nullable: false })
  @IsNotEmpty({
    message: 'иям пользователя не может быть пустым',
  })
  username: string;
  @ApiProperty({ description: '', nullable: false })
  isAdmin: boolean;
}
