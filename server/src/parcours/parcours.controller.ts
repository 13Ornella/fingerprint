import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParcoursService } from './parcours.service';
import { CreateParcourDto } from './dto/create-parcour.dto';
import { UpdateParcourDto } from './dto/update-parcour.dto';

@Controller('parcours')
export class ParcoursController {
  constructor(private readonly parcoursService: ParcoursService) {}

  @Post()
  create(@Body() createParcourDto: CreateParcourDto) {
    return this.parcoursService.create(createParcourDto);
  }

  @Get()
  findAll() {
    return this.parcoursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parcoursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParcourDto: UpdateParcourDto) {
    return this.parcoursService.update(+id, updateParcourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parcoursService.remove(+id);
  }
}
