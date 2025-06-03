import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Req,
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
import { CreateBoardDto } from './dto/create-board.dto';

@ApiTags('Boards')
@ApiBearerAuth()
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
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '게시글 생성' })
  @ApiBody({ type: CreateBoardDto })
  createBoard(@Body() body: CreateBoardDto, @Req() req) {
    const { title, content, category = BoardCategory.GENERAL } = body;
    const userId = req.user.id;
    return this.boardsService.createBoard(title, content, userId, category);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '게시글 삭제 (soft delete)' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  deleteBoard(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const userId = req.user.id;
    return this.boardsService.deleteBoard(id, userId);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '게시글 좋아요 추가' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  likeBoard(@Param('id', ParseIntPipe) boardId: number, @Req() req) {
    const userId = req.user.id;
    return this.boardsService.likeBoard(boardId, userId);
  }

  @Delete(':id/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '게시글 좋아요 취소' })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  unlikeBoard(@Param('id', ParseIntPipe) boardId: number, @Req() req) {
    const userId = req.user.id;
    return this.boardsService.unlikeBoard(boardId, userId);
  }
}
