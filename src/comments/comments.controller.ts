import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('board/:boardId')
  getComments(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.commentsService.getComments(boardId);
  }

  @Post('board/:boardId')
  createComment(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() body: { content: string; userId: number },
  ) {
    return this.commentsService.createComment(
      boardId,
      body.content,
      body.userId,
    );
  }

  @Patch(':id')
  updateComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body() body: { content: string; userId: number },
  ) {
    return this.commentsService.updateComment(
      commentId,
      body.content,
      body.userId,
    );
  }

  @Delete(':id')
  deleteComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body() body: { userId: number },
  ) {
    return this.commentsService.deleteComment(commentId, body.userId);
  }

  @Post(':id/like')
  likeComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body() body: { userId: number },
  ) {
    return this.commentsService.likeComment(commentId, body.userId);
  }

  @Delete(':id/like')
  unlikeComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body() body: { userId: number },
  ) {
    return this.commentsService.unlikeComment(commentId, body.userId);
  }
}
