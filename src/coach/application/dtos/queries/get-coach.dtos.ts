import { ApiProperty } from '@nestjs/swagger';

export class GetCoachDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public nameCoach: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
  @ApiProperty()
  public descriptionCoach: string;
  @ApiProperty()
  public imgCoach: string;
}