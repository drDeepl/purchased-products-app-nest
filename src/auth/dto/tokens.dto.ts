import { ApiProperty } from '@nestjs/swagger';
export class TokensDto {
  @ApiProperty({ description: 'access token', nullable: false })
  access_token: string;
  @ApiProperty({ description: 'refresh token', nullable: false })
  refresh_token: string;
}
