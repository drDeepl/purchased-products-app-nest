import { ApiProperty } from '@nestjs/swagger';
export class RoleDto {
  @ApiProperty({ nullable: false })
  role: string;
}
