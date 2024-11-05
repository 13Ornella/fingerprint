import { PartialType } from '@nestjs/mapped-types';
import { CreateParcourDto } from './create-parcour.dto';

export class UpdateParcourDto extends PartialType(CreateParcourDto) {}
