import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Users username', nullable: false })
  username: string;
  @ApiProperty({ description: 'User data of register', nullable: false })
  datetimeRegister: string;
  @ApiProperty({ description: 'Users role', nullable: false })
  role: string;
}
