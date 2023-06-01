import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { TransformInterceptor } from '../common/common.interceptor';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { Citizen } from './entity/citizen.entity';
import { CitizenService } from './citizen.service';
import { GenericStatus } from '../common/response.dto';

@UseInterceptors(TransformInterceptor)
@Controller('citizens')
export class CitizenController {
  constructor(private readonly citizenService: CitizenService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  async index(): Promise<GenericStatus<Citizen[]>> {
    return new GenericStatus({
      message: 'User retrieved,',
      data: await this.citizenService.get(),
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async show(
    @Param('id') id: number,
  ): Promise<GenericStatus<Citizen | undefined>> {
    return new GenericStatus({
      message: 'User retrieved,',
      data: await this.citizenService.findById(id),
    });
  }

  @Post('')
  async store(
    @Body(new ValidationPipe())
    request: CreateCitizenDto,
  ): Promise<Citizen> {
    return await this.citizenService.create(request);
  }
}
