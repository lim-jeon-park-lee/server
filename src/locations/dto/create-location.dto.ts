import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
