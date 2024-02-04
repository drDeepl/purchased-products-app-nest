import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'Users username', nullable: false })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({ description: 'Users password', nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string;
}
