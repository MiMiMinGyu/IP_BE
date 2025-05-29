import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test', description: '유저 아이디' })
  username: string;

  @ApiProperty({ example: '1234', description: '비밀번호' })
  password: string;
}
