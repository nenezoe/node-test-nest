import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GENDER } from '../enum/gender.enum';

@Entity({ name: 'citizens' })
export class Citizen extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  ward_id: number;

  @Column({ type: 'varchar', length: 191 })
  full_name: string;

  @Column({ type: 'enum', enum: GENDER })
  gender: string;

  @Column({ unique: true, type: 'varchar', length: 191 })
  phone: string;

  @Column({ type: 'varchar', length: 191 })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
