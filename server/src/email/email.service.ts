import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Configuration de Nodemailer avec Gmail SMTP ou un autre service SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Ou un autre service comme Mailjet ou Sendinblue
      auth: {
        user: process.env.EMAIL_USER, // Email de l'expéditeur
        pass: process.env.EMAIL_PASSWORD, // Mot de passe ou App Password
      },
    });
  }

  // Fonction pour envoyer un email de notification d'absence
  async sendAbsenceNotification(
    recipient: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject,
      text: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Notification d\'absence envoyée');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  }

  // Fonction pour envoyer une justification d'absence
  async sendJustification(
    recipient: string,
    subject: string,
    observation: string,
    period: string,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: `Justification d'absence pour la période: ${period}`,
      text: observation,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Justification d\'absence envoyée');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la justification:', error);
    }
  }
}
