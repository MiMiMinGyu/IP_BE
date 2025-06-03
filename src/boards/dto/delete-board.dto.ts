import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteBoardDto {
  @ApiProperty({ example: 1, description: '작성자 유저 ID' })
  @Type(() => Number)
  @IsInt()
  userId: number;
}
