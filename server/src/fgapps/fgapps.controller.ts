/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FgappsService } from './fgapps.service';
import { CreateFgappDto } from './dto/create-fgapp.dto';
import { UpdateFgappDto } from './dto/update-fgapp.dto';

@Controller('fgapps')
export class FgappsController {
  constructor(private readonly fgappsService: FgappsService) {}

  @Post()
  create(@Body() createFgappDto: CreateFgappDto) {
    return this.fgappsService.create(createFgappDto);
  }

  @Get()
  findAll() {
    return this.fgappsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fgappsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFgappDto: UpdateFgappDto) {
    return this.fgappsService.update(+id, updateFgappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fgappsService.remove(+id);
  }
}
