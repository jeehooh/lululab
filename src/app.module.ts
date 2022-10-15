import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'ormconfig';
import { UsersModule } from './users/users.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UsersModule, HospitalsModule, ReservationsModule],
})
export class AppModule {}
