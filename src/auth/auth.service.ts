import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async validateUser(username: string, password: string) {
    if (username === 'test' && password === '1234') {
      return { userId: 1, username };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    const payload = { username: user.username, sub: user.userId };

    // JWT 발급
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { studentId, nickname, name, email, password } = registerDto;

    const exists = await this.prismaService.user.findFirst({
      where: {
        OR: [{ studentId }, { nickname }, { email }],
      },
    });

    if (exists) {
      throw new ConflictException('이미 존재하는 사용자입니다.');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        studentId,
        nickname,
        name,
        email,
        password: hashed,
      },
    });

    return {
      message: '회원가입 성공',
      user: {
        id: user.id,
        studentId: user.studentId,
        nickname: user.nickname,
        email: user.email,
      },
    };
  }
}
