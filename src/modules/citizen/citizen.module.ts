import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitizenController } from './citizen.controller';
import { CitizenService } from './citizen.service';
import { Citizen } from './entity/citizen.entity';
import { Lga } from './entity/lga.entity';
import { State } from './entity/state.entity';
import { Ward } from './entity/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Citizen, Ward, Lga, State])],
  providers: [CitizenService],
  controllers: [CitizenController],
  exports: [CitizenService],
})
export class CitizenModule {}
