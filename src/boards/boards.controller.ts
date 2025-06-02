import {
  Controller,
  Get,
  Post,
  ParseIntPipe,
  UseGuards,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Boards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  getBoards() {
    return this.boardsService.getBoards();
  }

  @Get(':id')
  getBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoard(id);
  }

  @Post()
  createBoard(
    @Body() body: { title: string; content: string; userId: number },
  ) {
    const { title, content, userId } = body;
    return this.boardsService.createBoard(title, content, userId);
  }

  @Delete(':id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { userId: number },
  ) {
    return this.boardsService.deleteBoard(id, body.userId);
  }
}
