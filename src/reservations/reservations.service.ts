import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationsDto } from './dto/reservationsDto';
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

  async updateReservation(id: number, reservationsDto: ReservationsDto) {
    const reserve_date = reservationsDto.reserve_date;
    const reserve_time = reservationsDto.reserve_time;
    const hospital_id = reservationsDto.hospital_id;
    const checkAvailability = await this.reservationsRepository.findBy({
      reserve_date,
      reserve_time,
      hospital_id,
    });

    if (checkAvailability.length !== 0) {
      throw new HttpException('예약이 불가능한 시간입니다.', 400);
    }

    return await this.reservationsRepository.update({ id }, reservationsDto);
  }

  async updateNoShow(id: number, no_show: number) {
    const reservation = await this.reservationsRepository.findOneBy({ id });
    reservation.no_show = no_show;
    const updateNoShow = await this.reservationsRepository.update(
      { id },
      reservation,
    );
    return updateNoShow;
  }

  async noShowCheck(phone: string) {
    const list = await this.reservationsRepository.findBy({ phone });
    let i = null;
    for (i = 0; i < list.length; i++) {
      if (list[i].no_show === 1) {
        throw new HttpException('노쇼로 인해 예약이 불가능합니다.', 400);
      }
    }
  }

  async checkAvailability(reservationsDto: ReservationsDto) {
    const reserve_date = reservationsDto.reserve_date;
    const reserve_time = reservationsDto.reserve_time;
    const hospital_id = reservationsDto.hospital_id;
    const checkAvailability = await this.reservationsRepository.findBy({
      reserve_date,
      reserve_time,
      hospital_id,
    });

    if (checkAvailability.length !== 0) {
      throw new HttpException('예약이 불가능한 시간입니다.', 400);
    }
  }
}
