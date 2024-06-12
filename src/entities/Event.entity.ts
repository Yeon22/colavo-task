import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';

@Entity({ name: 'event' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'begin_at', comment: 'unix timestamp seconds' })
  beginAt: number;

  @Column('int', { name: 'end_at', comment: 'unix timestamp seconds' })
  endAt: number;

  @Column({ type: 'int', nullable: false, name: 'created_at' })
  createdAt: number;

  @Column({ type: 'int', nullable: false, name: 'updated_at' })
  updatedAt: number;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = dayjs().unix();
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.createdAt = dayjs().unix();
  }
}
