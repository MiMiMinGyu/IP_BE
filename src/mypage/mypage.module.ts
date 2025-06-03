import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';

@Module({
  imports: [PrismaModule],
  controllers: [MypageController],
  providers: [MypageService],
})
export class MypageModule {}
