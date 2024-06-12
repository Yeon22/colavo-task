import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsTimeZone,
  Matches,
} from 'class-validator';

export class GetTimeslotRequestDto {
  @ApiProperty({
    example: '20240301',
    description: '시작일',
  })
  @Matches(/^[0-9]{8}$/)
  start_day_identifier: string;

  @ApiProperty({
    example: 'Asia/Seoul',
  })
  @IsTimeZone()
  timezone_identifier: string;

  @ApiProperty({
    example: 1800,
    description: '서비스 제공 시간. 단위: 초',
  })
  @IsNumber()
  service_duration: number;

  @ApiProperty({
    example: 2,
    description: '시작일을 기준으로 몇일 치를 반환할지 결정',
  })
  @IsNumber()
  @IsOptional()
  days?: number = 1;

  @ApiProperty({
    example: 1800,
    description: '예약 가능 시간 주기. 단위: 초',
  })
  @IsNumber()
  @IsOptional()
  timeslot_interval?: number = 1800;

  @ApiProperty({
    example: false,
    description: '해당 기간에 이미 있는 Event(예약)을 무시할지 여부',
  })
  @IsBoolean()
  @IsOptional()
  is_ignore_schedule?: boolean = false;

  @ApiProperty({
    example: false,
    description:
      '해당 기간에 사롱에 설정되어 있는 is_day_off, open_interval, close_interval을 무시하고 하루 전체를 기간으로 설정할지 여부',
  })
  @IsBoolean()
  @IsOptional()
  is_ignore_workhour?: boolean = false;
}
