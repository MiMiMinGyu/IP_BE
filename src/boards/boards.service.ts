import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BoardCategory } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  /** 게시글 목록 조회 */
  async getBoardsByCategory(category: BoardCategory) {
    return this.prisma.board.findMany({
      where: { deletedAt: null, category },
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        _count: {
          select: {
            comments: { where: { deletedAt: null } },
            likes: true,
          },
        },
      },
    });
  }

  /** 게시글 단건 조회 */
  async getBoard(boardId: number) {
    // 조회수 증가
    await this.prisma.board.update({
      where: { id: boardId },
      data: { views: { increment: 1 } },
    });

    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        author: true,
        comments: {
          where: { deletedAt: null },
          include: {
            author: true,
            _count: { select: { likes: true } },
          },
        },
        _count: {
          select: { likes: true },
        },
      },
    });
    if (!board || board.deletedAt) throw new NotFoundException('게시글 없음');
    return board;
  }

  /** 게시글 생성 */
  async createBoard(
    title: string,
    content: string,
    userId: number,
    category: BoardCategory,
  ) {
    return this.prisma.board.create({
      data: {
        title,
        content,
        authorId: userId,
        category,
      },
    });
  }

  /** 게시글 수정 */
  async updateBoard(
    boardId: number,
    title: string,
    content: string,
    userId: number,
  ) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board || board.deletedAt) throw new NotFoundException('게시글 없음');
    if (board.authorId !== userId)
      throw new ForbiddenException('수정 권한 없음');

    return this.prisma.board.update({
      where: { id: boardId },
      data: { title, content },
    });
  }

  /** 게시글 삭제 (Soft delete) */
  async deleteBoard(boardId: number, userId: number) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board || board.deletedAt) throw new NotFoundException('게시글 없음');
    if (board.authorId !== userId)
      throw new ForbiddenException('삭제 권한 없음');

    return this.prisma.board.update({
      where: { id: boardId },
      data: { deletedAt: new Date() },
    });
  }

  /** 게시글 좋아요 추가 */
  async likeBoard(boardId: number, userId: number) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board || board.deletedAt) {
      throw new NotFoundException('게시글이 존재하지 않거나 삭제되었습니다.');
    }

    const existing = await this.prisma.boardLike.findUnique({
      where: { userId_boardId: { userId, boardId } },
    });
    if (existing) throw new ConflictException('이미 좋아요를 누르셨습니다.');

    return this.prisma.boardLike.create({ data: { boardId, userId } });
  }

  /** 게시글 좋아요 취소 */
  async unlikeBoard(boardId: number, userId: number) {
    try {
      return await this.prisma.boardLike.delete({
        where: { userId_boardId: { userId, boardId } },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('좋아요 기록이 존재하지 않습니다.');
      }
      throw error;
    }
  }
}
