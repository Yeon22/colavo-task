import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WEEKDAY, Workhour } from './entities/Workhour.entity';
import { Repository } from 'typeorm';
import { GetTimeslotResponseDto } from './dto/get-timeslot.response.dto';
import { GetTimeslotRequestDto } from './dto/get-timeslot.request.dto';
import * as dayjs from 'dayjs';

const DAY_SECONDS = 60 * 60 * 24;

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Workhour)
    private workhourRepository: Repository<Workhour>,
  ) {}

  async getWorkhours(): Promise<Workhour[]> {
    return this.workhourRepository.find();
  }

  /**
   * @param dayIdentifier '20210910'
   * @param timezone 'Asia/Seoul'
   * @returns
   */
  createDateFromTimezone(dayIdentifier: string, timezone: string) {
    const date = new Date(
      `${dayIdentifier.substring(0, 4)}/${dayIdentifier.substring(4, 6)}/${dayIdentifier.substring(6, 8)}`,
    );
    return dayjs(date).tz(timezone);
  }

  async getTimeSlots(
    timeslotDto: GetTimeslotRequestDto,
  ): Promise<GetTimeslotResponseDto[]> {
    const daysArr = new Array(timeslotDto?.days || 1).fill(null);
    const daysTimestampAndWeekday = daysArr.map((_, i) => {
      const date = this.createDateFromTimezone(
        String(Number(timeslotDto.start_day_identifier) + i),
        timeslotDto.timezone_identifier,
      );
      return {
        dayTimestamp: date.unix(),
        weekday: (date.day() + 1) as WEEKDAY,
      };
    });

    const workhours = await this.getWorkhours();
    const workhoursMap = new Map(
      Object.entries(workhours).map(([_, workhour]) => [
        workhour.weekday,
        workhour,
      ]),
    );
    const startDate = this.createDateFromTimezone(
      timeslotDto.start_day_identifier,
      timeslotDto.timezone_identifier,
    );

    return daysTimestampAndWeekday.map(({ dayTimestamp, weekday }) => {
      const workhour = workhoursMap.get(weekday);
      const { isDayOff, openInterval, closeInterval } = workhour;
      const defaultObj = {
        start_of_day: dayTimestamp,
        day_modifier: Math.floor(
          (dayTimestamp - startDate.unix()) / DAY_SECONDS,
        ),
        is_day_off: workhoursMap.get(weekday).isDayOff,
      };

      if (isDayOff) {
        return {
          ...defaultObj,
          timeslots: [],
        };
      }

      const openTimestamp = openInterval + dayTimestamp;
      const closeTimestamp = closeInterval + dayTimestamp;
      const timeslotInterval = timeslotDto.timeslot_interval;

      let timeslots = [];
      let time = openTimestamp;
      while (time + timeslotInterval < closeTimestamp) {
        timeslots.push({ begin_at: time, end_at: time + timeslotInterval });
        time += timeslotInterval;
      }

      return { ...defaultObj, timeslots };
    });
  }
}
