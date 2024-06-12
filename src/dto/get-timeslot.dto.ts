import { ApiProperty, OmitType } from '@nestjs/swagger';
import { GetTimeslotRequestDto } from './get-timeslot.request.dto';
import { IsNumber } from 'class-validator';
import { WEEKDAY } from 'src/entities/Workhour.entity';

export class GetTimeSlotDto extends OmitType(GetTimeslotRequestDto, [
  'start_day_identifier',
]) {
  @ApiProperty({
    example: 1538697600,
    description: '요청으로 들어온 시작 날짜의 unix timestamp',
  })
  @IsNumber()
  start_day_timestamp: number;

  @ApiProperty({
    example: 1,
    description: '요청으로 들어온 시작 날짜의 weekday',
  })
  @IsNumber()
  weekday: WEEKDAY;
}
