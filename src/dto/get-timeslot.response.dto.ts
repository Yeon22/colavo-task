import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { TimeslotDto } from './timeslot.dto';

export class GetTimeslotResponseDto {
  @ApiProperty({
    example: 1538697600,
    description: '해당 날짜. Unixstamp seconds',
  })
  @IsNumber()
  start_of_day: number;

  @ApiProperty({
    example: 2,
    description:
      '요청으로 온 날짜로부터 얼마만큼 차이나는지. yesterday: -1, today: 0, tomorrow: 1',
  })
  @IsNumber()
  day_modifier: number;

  @ApiProperty({
    example: false,
    description: '업무 시간인지 아닌지 표시',
  })
  @IsBoolean()
  is_day_off: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeslotDto)
  timeslots: TimeslotDto[];
}
