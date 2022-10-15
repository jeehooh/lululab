import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { Reservations } from './reservations.entity';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservations])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
