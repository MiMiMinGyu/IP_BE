import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { MypageModule } from './mypage/mypage.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    BoardsModule,
    PrismaModule,
    AuthModule,
    CommentsModule,
    MypageModule,
    ScheduleModule,
  ],
})
export class AppModule {}
