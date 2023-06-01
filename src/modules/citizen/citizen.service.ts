import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { Citizen } from './entity/citizen.entity';
import { Ward } from './entity/ward.entity';

@Injectable()
export class CitizenService {
  constructor(
    @InjectRepository(Citizen)
    private readonly citizenRepository: Repository<Citizen>,

    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async get(): Promise<Citizen[]> {
    return await this.citizenRepository.find({
      relations: ['categories'],
    });
  }

  async findById(id: number): Promise<Citizen | undefined> {
    return this.citizenRepository.findOneOrFail({
      where: { id },
      relations: ['ward'],
    });
  }

  async create(payload: CreateCitizenDto): Promise<Citizen> {
    const citizen = this.citizenRepository.create(payload);

    await this.citizenRepository.save(Citizen);
    return citizen;
  }
}
