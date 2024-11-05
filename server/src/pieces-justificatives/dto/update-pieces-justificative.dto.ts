import { PartialType } from '@nestjs/mapped-types';
import { CreatePiecesJustificativeDto } from './create-pieces-justificative.dto';

export class UpdatePiecesJustificativeDto extends PartialType(CreatePiecesJustificativeDto) {}
