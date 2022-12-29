import { ApiProperty } from '@nestjs/swagger';

export class LoginInfoDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
