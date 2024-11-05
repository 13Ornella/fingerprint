import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PiecesJustificativesService } from './pieces-justificatives.service';
import { CreatePiecesJustificativeDto } from './dto/create-pieces-justificative.dto';
import { UpdatePiecesJustificativeDto } from './dto/update-pieces-justificative.dto';

@Controller('pieces-justificatives')
export class PiecesJustificativesController {
  constructor(private readonly piecesJustificativesService: PiecesJustificativesService) {}

  @Post()
  create(@Body() createPiecesJustificativeDto: CreatePiecesJustificativeDto) {
    return this.piecesJustificativesService.create(createPiecesJustificativeDto);
  }

  @Get()
  findAll() {
    return this.piecesJustificativesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piecesJustificativesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePiecesJustificativeDto: UpdatePiecesJustificativeDto) {
    return this.piecesJustificativesService.update(+id, updatePiecesJustificativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piecesJustificativesService.remove(+id);
  }
}
