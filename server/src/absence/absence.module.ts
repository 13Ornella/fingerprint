import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { EmailModule } from '../email/email.module'; // Importer EmailModule pour envoyer des emails

@Module({
  imports: [EmailModule], // Importer le module Email
  providers: [AbsenceService],
  controllers: [AbsenceController],
})
export class AbsenceModule {}
    