import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class ReservationsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  reservator: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
    message: '날짜 형식은 2022-01-01 형식이여야 합니다',
  })
  reserve_date: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: '시간 형식은 12:00 형식이여야 합니다',
  })
  reserve_time: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  type_id: number;

  @IsNumber()
  @IsNotEmpty()
  hospital_id: number;
}

export class ChangeReservationsDto {
  @IsString()
  name: string;

  @IsString()
  reservator: string;

  @IsString()
  @Matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
    message: '날짜 형식은 2022-01-01 형식이여야 합니다',
  })
  reserve_date: string;

  @IsString()
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: '시간 형식은 12:00 형식이여야 합니다',
  })
  reserve_time: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsNumber()
  type_id: number;

  @IsNumber()
  hospital_id: number;
}

export class ReservationTypesDto {
  @IsString()
  type: string;
}
