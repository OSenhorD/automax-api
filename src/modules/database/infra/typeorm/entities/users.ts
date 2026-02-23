import { PrimaryColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt?: Date;
}
