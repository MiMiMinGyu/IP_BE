import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: '20230001',
    description: '학번 (유저 ID로 사용)',
  })
  @IsString()
  studentId: string;

  @ApiProperty({
    example: 'jayson123',
    description: '닉네임 (고유)',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: '이민규',
    description: '실명',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'jayson@example.com',
    description: '이메일 주소 (형식 유효성 검사 포함)',
  })
  @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
  email: string;

  @ApiProperty({
    example: 'abcd1234',
    description: '비밀번호 (최소 4자)',
  })
  @IsString()
  @MinLength(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' })
  password: string;
}
