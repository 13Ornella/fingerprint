import { Controller, Get, Post, Body } from '@nestjs/common';
import { AbsenceService } from './absence.service';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  // Route pour récupérer les absences
  @Get()
  getAbsences() {
    return this.absenceService.getAbsences();
  }

  // Route pour notifier un étudiant par email
  @Post('notify')
  async notifyAbsence(@Body('email') email: string): Promise<void> {
    await this.absenceService.notifyAbsence(email);
  }

  // Route pour transférer une justification d'absence
  @Post('justification')
  async transferJustification(
    @Body('email') email: string,
    @Body('period') period: string,
    @Body('observation') observation: string,
  ): Promise<void> {
    await this.absenceService.transferJustification(email, period, observation);
  }
}
