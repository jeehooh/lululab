import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeReservationsDto, ReservationsDto } from './dto/reservationsDto';
import { Reservations, ReservationTypes } from './reservations.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    @InjectRepository(ReservationTypes)
    private reservationsRepository: Repository<Reservations>,
  ) {}

  async unavailableList(reserve_date: string, reserve_time: string) {
    return await this.reservationsRepository.findBy({
      reserve_date,
      reserve_time,
    });
  }

  async unavailableListByHospital(
    hospital_id: number,
    reserve_date: string,
    reserve_time: string,
  ) {
    return await this.reservationsRepository.findBy({
      hospital_id,
      reserve_date,
      reserve_time,
    });
  }

  async makeReservation(reservationsDto: ReservationsDto) {
    return await this.reservationsRepository.save(reservationsDto);
  }

  async reservationDuplicateCheck(reservationsDto: ReservationsDto) {
    return await this.reservationsRepository.findOneBy(reservationsDto);
  }

  async reservationList(id: number, reservator: string) {
    return await this.reservationsRepository.findBy({ id, reservator });
  }

  async updateReservation(
    id: number,
    changeReservationsDto: ChangeReservationsDto,
  ) {
    return await this.reservationsRepository.update(
      { id },
      changeReservationsDto,
    );
  }
}
