import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsInt,
} from 'class-validator';
import { BoardCategory } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    example: '제목입니다',
    description: '게시글 제목',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '내용입니다',
    description: '게시글 본문',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    enum: BoardCategory,
    example: BoardCategory.GENERAL,
    description: '게시글 카테고리 (선택)',
  })
  @IsOptional()
  @IsEnum(BoardCategory)
  category?: BoardCategory;
}
