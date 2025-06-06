import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
