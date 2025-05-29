import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '20230001',
    description: '로그인 학번 (유저 ID)',
  })
  @IsString()
  studentId: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호 (최소 4자)',
  })
  @IsString()
  @MinLength(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' })
  password: string;
}
