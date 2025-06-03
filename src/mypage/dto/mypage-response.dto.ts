import { ApiProperty } from '@nestjs/swagger';
import { BoardCategory } from '@prisma/client';

export class MyProfileResponseDto {
  @ApiProperty({ example: '20231001' })
  studentId: string;

  @ApiProperty({ example: '홍길동' })
  name: string;

  @ApiProperty({ example: 'gildong123' })
  nickname: string;

  @ApiProperty({ example: 'gildong@email.com' })
  email: string;
}

export class MyPostResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '게시글 제목입니다' })
  title: string;

  @ApiProperty({ enum: BoardCategory })
  category: BoardCategory;

  @ApiProperty({ example: '2024-06-01T12:34:56Z' })
  createdAt: Date;
}

export class MyLikedPostResponseDto extends MyPostResponseDto {}

export class MyCommentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '댓글 내용입니다' })
  content: string;

  @ApiProperty({ example: 1 })
  boardId: number;

  @ApiProperty({ example: '2024-06-01T12:34:56Z' })
  createdAt: Date;
}
