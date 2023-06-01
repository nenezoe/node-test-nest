import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  ValidationPipe,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { RegisterDto } from 'src/modules/user/dto/register.dto';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { GenericStatus } from '../common/response.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: any): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('user')
  async getUser(@Request() req: any): Promise<any> {
    return req.user;
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe())
    request: RegisterDto,
  ): Promise<GenericStatus<User>> {
    return new GenericStatus({
      message: 'User registered successfully,',
      data: await this.userService.create(request),
    });
  }
}
