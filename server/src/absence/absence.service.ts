import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class AbsenceService {
  constructor(private readonly emailService: EmailService) {}

  // Méthode pour envoyer une notification d'absence
  async notifyAbsence(email: string): Promise<void> {
    const subject = 'Notification d\'absence';
    const message = `Vous avez été absent lors de la période X. Veuillez fournir une justification.`;
    await this.emailService.sendAbsenceNotification(email, subject, message);
  }

  // Méthode pour transférer une justification d'absence
  async transferJustification(email: string, period: string, observation: string): Promise<void> {
    const subject = 'Justification d\'absence';
    await this.emailService.sendJustification(email, subject, observation, period);
  }

  // Méthode pour récupérer des absences (simulé ici)
  getAbsences(): string {
    return 'Voici la liste des absences.';
  }
}
