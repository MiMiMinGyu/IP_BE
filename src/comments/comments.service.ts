import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments(boardId: number) {
    return this.prisma.comment.findMany({
      where: {
        boardId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'asc' },
      include: {
        author: true,
        _count: { select: { likes: true } },
      },
    });
  }

  async createComment(boardId: number, content: string, userId: number) {
    return this.prisma.comment.create({
      data: {
        boardId,
        content,
        authorId: userId,
      },
    });
  }

  async updateComment(commentId: number, content: string, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment || comment.deletedAt) throw new NotFoundException('댓글 없음');
    if (comment.authorId !== userId)
      throw new ForbiddenException('수정 권한 없음');

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment || comment.deletedAt) throw new NotFoundException('댓글 없음');
    if (comment.authorId !== userId)
      throw new ForbiddenException('삭제 권한 없음');

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { deletedAt: new Date() },
    });
  }

  async likeComment(commentId: number, userId: number) {
    const existing = await this.prisma.commentLike.findUnique({
      where: { userId_commentId: { userId, commentId } },
    });
    if (existing) throw new Error('이미 좋아요를 눌렀습니다.');

    return this.prisma.commentLike.create({
      data: { commentId, userId },
    });
  }

  async unlikeComment(commentId: number, userId: number) {
    return this.prisma.commentLike.delete({
      where: { userId_commentId: { userId, commentId } },
    });
  }
}
