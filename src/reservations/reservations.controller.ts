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
import { ChangeReservationsDto, ReservationsDto } from './dto/reservationsDto';
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
    const check = await this.reservationsService.reservationDuplicateCheck(
      reservationsDto,
    );

    if (check) {
      return Object.assign({ message: '존재하는 예약입니다.' });
    }

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
    @Body() changeReservationsDto: ChangeReservationsDto,
  ) {
    const updateReservation = await this.reservationsService.updateReservation(
      id,
      changeReservationsDto,
    );

    if (updateReservation.affected === 1) {
      return Object.assign({ message: '예약 변경 성공!' });
    }

    return updateReservation;
  }
}
