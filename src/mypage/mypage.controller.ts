import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { MypageService } from './mypage.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  MyProfileResponseDto,
  MyCommentResponseDto,
  MyLikedPostResponseDto,
  MyPostResponseDto,
} from './dto/mypage-response.dto';

@ApiTags('MyPage')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Get()
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiOkResponse({ type: MyProfileResponseDto })
  getProfile(@Req() req: Request) {
    return this.mypageService.getProfile(req.user!.id);
  }

  @Get('posts')
  @ApiOperation({ summary: '내가 작성한 게시글 목록' })
  @ApiOkResponse({ type: [MyPostResponseDto] })
  getMyPosts(@Req() req: Request) {
    return this.mypageService.getMyPosts(req.user!.id);
  }

  @Get('likes')
  @ApiOperation({ summary: '내가 좋아요한 게시글 목록' })
  @ApiOkResponse({ type: [MyLikedPostResponseDto] })
  getLikedPosts(@Req() req: Request) {
    return this.mypageService.getLikedPosts(req.user!.id);
  }

  @Get('comments')
  @ApiOperation({ summary: '내가 작성한 댓글 목록' })
  @ApiOkResponse({ type: [MyCommentResponseDto] })
  getMyComments(@Req() req: Request) {
    return this.mypageService.getMyComments(req.user!.id);
  }
}
