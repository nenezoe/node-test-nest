import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GENDER } from '../enum/gender.enum';

export class CreateCitizenDto {
  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsPositive()
  ward_id: number;
}
