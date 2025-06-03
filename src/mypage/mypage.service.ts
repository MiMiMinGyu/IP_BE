// src/mypage/mypage.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MypageService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        studentId: true,
        name: true,
        nickname: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            Board: true,
            comments: true,
            boardLikes: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('유저 정보를 찾을 수 없습니다');

    return user;
  }

  async getMyPosts(userId: number) {
    return this.prisma.board.findMany({
      where: {
        authorId: userId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            comments: { where: { deletedAt: null } },
            likes: true,
          },
        },
      },
    });
  }

  async getLikedPosts(userId: number) {
    return this.prisma.boardLike.findMany({
      where: {
        userId,
        board: { deletedAt: null },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        board: {
          include: {
            author: true,
            _count: {
              select: {
                comments: { where: { deletedAt: null } },
                likes: true,
              },
            },
          },
        },
      },
    });
  }

  async getMyComments(userId: number) {
    return this.prisma.comment.findMany({
      where: {
        authorId: userId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        board: true,
        _count: {
          select: { likes: true },
        },
      },
    });
  }
}
