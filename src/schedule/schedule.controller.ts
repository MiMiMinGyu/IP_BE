import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { ScheduleResponseDto } from './dto/schedule-response.dto';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({ summary: '학사 일정 전체 조회' })
  @ApiResponse({
    status: 200,
    description: '학사 일정 리스트 반환',
    type: ScheduleResponseDto,
    isArray: true,
  })
  async getSchedules(): Promise<ScheduleResponseDto[]> {
    return await this.scheduleService.getAllSchedules();
  }
}
