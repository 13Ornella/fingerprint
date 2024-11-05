/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FgappsService } from './fgapps.service';
import { FgappsController } from './fgapps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fgapp } from './entities/fgapp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fgapp])],
  controllers: [FgappsController],
  providers: [FgappsService],
})
export class FgappsModule {}
