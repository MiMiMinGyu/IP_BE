import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardCategory } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Boards')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('category/:category')
  @ApiOperation({ summary: '카테고리별 게시글 목록 조회' })
  @ApiParam({
    name: 'category',
    enum: BoardCategory,
    description: '게시글 카테고리',
  })
  getBoardsByCategory(@Param('category') category: BoardCategory) {
    return this.boardsService.getBoardsByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 단건 조회' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  getBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoard(id);
  }

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: '제목입니다' },
        content: { type: 'string', example: '내용입니다' },
        userId: { type: 'number', example: 1 },
        category: {
          type: 'string',
          enum: Object.values(BoardCategory),
          example: BoardCategory.GENERAL,
        },
      },
      required: ['title', 'content', 'userId'],
    },
  })
  createBoard(
    @Body()
    body: {
      title: string;
      content: string;
      userId: number;
      category?: BoardCategory;
    },
  ) {
    const { title, content, userId, category = BoardCategory.GENERAL } = body;
    return this.boardsService.createBoard(title, content, userId, category);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제 (soft delete)' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
      },
      required: ['userId'],
    },
  })
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { userId: number },
  ) {
    return this.boardsService.deleteBoard(id, body.userId);
  }
}
