import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ nullable: false })
  id: number;
  @ApiProperty({ nullable: false })
  username: string;
  @ApiProperty({ nullable: false })
  isAdmin: boolean;
  @ApiProperty({ nullable: false })
  passwordHash: string;

  constructor(
    username: string,
    passwordHash: string,
    isAdmin: boolean = false,
  ) {
    this.username = username;
    this.passwordHash = passwordHash;
    this.isAdmin = isAdmin;
  }
}
