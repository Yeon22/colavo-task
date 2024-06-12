import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { Event } from './entities/Event.entity';
import { WEEKDAY, Workhour } from './entities/Workhour.entity';
import { GetTimeslotRequestDto } from './dto/get-timeslot.request.dto';
import { GetTimeslotResponseDto } from './dto/get-timeslot.response.dto';

const DAY_SECONDS = 60 * 60 * 24;

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Workhour)
    private workhourRepository: Repository<Workhour>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async getEventByTime(openTimestamp: number, closeTimestamp: number) {
    return this.eventRepository.find({
      where: {
        beginAt: MoreThanOrEqual(openTimestamp),
        endAt: LessThan(closeTimestamp),
      },
    });
  }

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
    const daysEmptyArr = new Array(Math.max(timeslotDto.days, 1)).fill(null);
    const daysTimestampAndWeekday = daysEmptyArr.map((_, i) => {
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

    const startDateTimestamp = this.createDateFromTimezone(
      timeslotDto.start_day_identifier,
      timeslotDto.timezone_identifier,
    ).unix();

    const events = (
      await Promise.all(
        daysTimestampAndWeekday
          .map((v) => v.dayTimestamp)
          .map((dt) => this.getEventByTime(dt, dt + DAY_SECONDS)),
      )
    ).flat();

    return daysTimestampAndWeekday.map(({ dayTimestamp, weekday }) => {
      const workhour = workhoursMap.get(weekday);
      const defaultObj = {
        start_of_day: dayTimestamp,
        day_modifier: Math.floor(
          (dayTimestamp - startDateTimestamp) / DAY_SECONDS,
        ),
        is_day_off: workhoursMap.get(weekday).isDayOff,
      };

      if (workhour.isDayOff && !timeslotDto.is_ignore_workhour) {
        return {
          ...defaultObj,
          timeslots: [],
        };
      }

      const openTimestamp = workhour.openInterval + dayTimestamp;
      const closeTimestamp = workhour.closeInterval + dayTimestamp;
      const timeslotInterval = timeslotDto.timeslot_interval;

      let timeslots = [];
      let tempStartTime = timeslotDto.is_ignore_workhour
        ? dayTimestamp
        : openTimestamp;
      const tempEndTime = timeslotDto.is_ignore_workhour
        ? dayTimestamp + DAY_SECONDS
        : closeTimestamp;

      while (tempStartTime + timeslotInterval <= tempEndTime) {
        const event = events.find(
          (e) =>
            e.beginAt >= tempStartTime &&
            e.endAt <= tempStartTime + timeslotDto.service_duration,
        );

        if (!timeslotDto.is_ignore_schedule && event) {
          tempStartTime += timeslotInterval;
          continue;
        }

        timeslots.push({
          begin_at: tempStartTime,
          end_at: tempStartTime + timeslotInterval,
        });

        tempStartTime += timeslotInterval;
      }

      return { ...defaultObj, timeslots };
    });
  }
}
