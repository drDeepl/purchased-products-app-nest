import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'user id', nullable: false })
  id: number;
  @ApiProperty({ description: 'Users username', nullable: false })
  username: string;
  @ApiProperty({ description: 'is admin', nullable: false })
  isAdmin: boolean;
}
