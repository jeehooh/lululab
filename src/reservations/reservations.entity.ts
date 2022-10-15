import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reservations')
export class Reservations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  reservator: string;

  @Column()
  reserve_time: Date;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  type_id: number;

  @Column()
  hospital_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity('reservation_types')
export class ReservationTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
