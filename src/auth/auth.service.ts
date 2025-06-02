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

  async validateUser(studentId: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { studentId },
    });

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }

  async login(studentId: string, password: string) {
    const user = await this.validateUser(studentId, password);
    const payload = {
      sub: user.id,
      studentId: user.studentId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        studentId: user.studentId,
        nickname: user.nickname,
        email: user.email,
      },
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
