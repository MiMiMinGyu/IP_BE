import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { MypageModule } from './mypage/mypage.module';

@Module({
  imports: [
    BoardsModule,
    PrismaModule,
    AuthModule,
    CommentsModule,
    MypageModule,
  ],
})
export class AppModule {}
