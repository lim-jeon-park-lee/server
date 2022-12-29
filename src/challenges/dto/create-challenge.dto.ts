import { ApiProperty } from '@nestjs/swagger';

export class CreateChallengeDto {
  @ApiProperty()
  userId: number;
}
