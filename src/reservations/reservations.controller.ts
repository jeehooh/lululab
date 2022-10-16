import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationsDto } from './dto/reservationsDto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async unavailableList(
    @Body('hospitalId') id: number,
    @Body('date') reserve_date: string,
    @Body('time') reserve_time: string,
  ) {
    const unavailableList = await this.reservationsService.unavailableList(
      reserve_date,
      reserve_time,
    );

    return Object.assign(unavailableList);
  }

  @Get('/hospital/:hospital_id')
  @UsePipes(ValidationPipe)
  async unavailableListByHospital(
    @Param('hospital_id') hospital_id: number,
    @Body('date') reserve_date: string,
    @Body('time') reserve_time: string,
  ) {
    const unavailableListByHospital =
      await this.reservationsService.unavailableListByHospital(
        hospital_id,
        reserve_date,
        reserve_time,
      );

    if (unavailableListByHospital.length === 0) {
      return Object.assign({ message: '예약 가능' });
    } else {
      return Object.assign(unavailableListByHospital);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async makeReservation(@Body() reservationsDto: ReservationsDto) {
    const phone: string = reservationsDto.phone;
    await this.reservationsService.noShowCheck(phone);

    const reservationCheck =
      await this.reservationsService.reservationDuplicateCheck(reservationsDto);

    if (reservationCheck) {
      return Object.assign({ message: '존재하는 예약입니다.' });
    }

    await this.reservationsService.checkAvailability(reservationsDto);

    await this.reservationsService.makeReservation(reservationsDto);
    return Object.assign({ message: '예약 성공!' });
  }

  @Get('/list')
  @UsePipes(ValidationPipe)
  async reservationList(
    @Body('id') id: number,
    @Body('reservator') reservator: string,
  ) {
    const reservationList = await this.reservationsService.reservationList(
      id,
      reservator,
    );

    if (reservationList.length === 0) {
      throw new NotFoundException({ message: '일치하는 예약이 없습니다.' });
    }

    return reservationList;
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateReservation(
    @Param('id') id: number,
    @Body() reservationsDto: ReservationsDto,
  ) {
    const updateReservation = await this.reservationsService.updateReservation(
      id,
      reservationsDto,
    );

    if (updateReservation.affected === 1) {
      return Object.assign({ message: '예약 변경 성공!' });
    }

    return updateReservation;
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateNoShow(@Body('id') id: number, @Body('no_show') no_show: number) {
    const updateNoShow = await this.reservationsService.updateNoShow(
      id,
      no_show,
    );

    if (updateNoShow.affected === 1) {
      return Object.assign({ message: '노쇼 정보 수정 완료.' });
    }
  }
}
