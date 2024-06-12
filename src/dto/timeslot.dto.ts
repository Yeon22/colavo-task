import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TimeslotDto {
  @ApiProperty({
    example: 1538742600,
    description: '예약 가능한 타임. unix timestamp',
  })
  @IsNumber()
  begin_at: number;

  @ApiProperty({
    example: 1538742600,
    description: '예약 가능한 타임 끝나는 시간. unix timestamp',
  })
  @IsNumber()
  end_at: number;
}
