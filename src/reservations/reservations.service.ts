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
    const reserve_date = changeReservationsDto.reserve_date;
    const reserve_time = changeReservationsDto.reserve_time;
    const hospital_id = changeReservationsDto.hospital_id;
    const checkAvailability = await this.reservationsRepository.findBy({
      reserve_date,
      reserve_time,
      hospital_id,
    });

    if (checkAvailability.length !== 0) {
      return Object.assign({ message: '예약이 불가능한 시간입니다.' });
    }

    console.log(checkAvailability);

    return await this.reservationsRepository.update(
      { id },
      changeReservationsDto,
    );
  }
}
