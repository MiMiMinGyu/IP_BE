import { ApiProperty } from '@nestjs/swagger';

export class ScheduleResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '중간고사' })
  title: string;

  @ApiProperty({ example: '2025-04-14T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2025-04-18T00:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ example: '#4e73df' })
  color: string;
}
