import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async likeBoard(boardId: number, userId: number) {
    const existing = await this.prisma.boardlike.findUnique({
      where: { userId_boardId: { userId, boardId } },
    });
    if (existing) throw new Error('이미 좋아요를 눌렀습니다.');

    return this.prisma.boardLike.create({
      data: { boardId, userId },
    });
  }
}
