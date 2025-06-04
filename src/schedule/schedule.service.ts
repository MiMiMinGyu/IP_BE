import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import type { SchoolSchedule } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSchedules(): Promise<ScheduleResponseDto[]> {
    const schedules: SchoolSchedule[] =
      await this.prisma.schoolSchedule.findMany();

    return schedules.map(
      (s): ScheduleResponseDto => ({
        id: s.id,
        title: s.title,
        startDate: s.startDate,
        endDate: s.endDate ?? s.startDate,
        color: s.color ?? '#4e73df',
      }),
    );
  }
}
