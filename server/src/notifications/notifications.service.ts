/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationsRepository.create(createNotificationDto);
    return await this.notificationsRepository.save(notification);
  }

  async findAll() {
    return await this.notificationsRepository.find();
  }

  async findOne(id: number) {
    return await this.notificationsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.findOne(id);

    if (!notification) {
      throw new NotFoundException();
    }

    Object.assign(notification, updateNotificationDto);
    return await this.notificationsRepository.save(notification);
  }

  async remove(id: number) {
    const notification = await this.findOne(id);
    if (!notification) {
      throw new NotFoundException();
    }
    return await this.notificationsRepository.remove(notification);
  }
}
