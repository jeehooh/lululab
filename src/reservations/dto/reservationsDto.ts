import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReservationsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  reservator: string;

  @IsString()
  @IsNotEmpty()
  reserve_date: string;

  @IsString()
  @IsNotEmpty()
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
  reserve_date: string;

  @IsString()
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
