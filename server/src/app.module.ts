/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { FgappsModule } from './fgapps/fgapps.module';
import { EtudiantsModule } from './etudiants/etudiants.module';
import { MatieresModule } from './matieres/matieres.module';
import { PiecesJustificativesModule } from './pieces-justificatives/pieces-justificatives.module';
import { ProfesseursModule } from './professeurs/professeurs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ParcoursModule } from './parcours/parcours.module';
import { RolesModule } from './roles/roles.module';
import { EmailModule } from './email/email.module';
import { AbsenceController } from './absence/absence.controller';
import { AbsenceService } from './absence/absence.service';
import { AbsenceModule } from './absence/absence.module';
import { GestionsModule } from './gestions/gestions.module';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,  // Rendre les variables d'env accessibles globalement
        envFilePath: '.env',  // Assurez-vous que le chemin est correct
      }
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('DB_PASSWORD:', configService.get('DB_PASSWORD'));
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [join(process.cwd(), 'dist/**/*.entity.js')],
          synchronize: true,
        };
      },
      
    }),
    EmailModule,
    AbsenceModule,
    FgappsModule,
    EtudiantsModule,
    MatieresModule,
    PiecesJustificativesModule,
    ProfesseursModule,
    NotificationsModule,
    ParcoursModule,
    RolesModule,
    EmailModule,
    AbsenceModule,
    GestionsModule,
    MailsModule
  ],
  controllers: [AppController, AbsenceController],
  providers: [AppService, AbsenceService],
})
export class AppModule {}
