import {
  Controller,
  Get,
  Post,
  Body,
<<<<<<< Updated upstream
  Param,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards.model';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
=======
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
>>>>>>> Stashed changes

@ApiTags('Boards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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
