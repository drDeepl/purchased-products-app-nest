import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'user id', nullable: false })
  id: number;
  @ApiProperty({ description: 'Users username', nullable: false })
  @IsNotEmpty({
    message: 'иям пользователя не может быть пустым',
  })
  username: string;
  @ApiProperty({ description: 'is admin', nullable: false })
  isAdmin: boolean;
}
