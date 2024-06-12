import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export type WEEKDAY = 1 | 2 | 3 | 4 | 5 | 6 | 7;

@Entity({ name: 'workhour' })
export class Workhour {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('bool', { name: 'is_day_off' })
  isDayOff: boolean;

  @Index('workhour_weekday')
  @Column('int', { name: 'weekday', comment: 'Sun: 1 ~ Sat: 7' })
  weekday: WEEKDAY;

  @Column('int', { name: 'open_interval', comment: '오픈 시간. 초 단위' })
  openInterval: number;

  @Column('int', { name: 'close_interval', comment: '마감 시간. 초 단위' })
  closeInterval: number;
}
