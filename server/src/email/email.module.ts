import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // Exporter pour que d'autres modules puissent l'utiliser
})
export class EmailModule {}
