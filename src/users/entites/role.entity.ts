import { RoleDto } from '../dto/role.dto';
import { ApiProperty } from '@nestjs/swagger';
export class RoleEntity extends RoleDto {
  @ApiProperty({ nullable: false })
  id: number;
}
