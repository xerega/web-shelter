import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './types/jwt-payload.types';
import { UserResponse } from './types/user-response.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<UserResponse> {
    await this.createUser(dto);

    const response = await this.signIn(dto);

    return response;
  }

  async signIn(dto: SignInDto): Promise<UserResponse> {
    const { email, password } = dto;

    const user = await this.usersRepository.findOneBy({ email });

    const { password: userPassword, ...other } = user;

    if (!user) {
      throw new NotFoundException("User with such email doesn't exist");
    }

    const doesPasswordsMatch = await bcrypt.compare(password, userPassword);

    if (user && doesPasswordsMatch) {
      const payload: JwtPayload = { email };

      const accessToken = this.jwtService.sign(payload);

      return {
        ...other,
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Login or password are invalid');
    }
  }

  private async createUser(dto: SignUpDto): Promise<void> {
    const { email, username, password } = dto;

    const salt = await bcrypt.genSalt();
    const saltedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      email,
      username,
      password: saltedPassword,
      streak: 0,
      experience: 0,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username is already taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
