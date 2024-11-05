import { PartialType } from '@nestjs/mapped-types';
import { CreateFgappDto } from './create-fgapp.dto';

export class UpdateFgappDto extends PartialType(CreateFgappDto) {}
