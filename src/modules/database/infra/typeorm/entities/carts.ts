import { PrimaryColumn, Entity, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '@/modules/database/infra/typeorm/entities/users';

@Entity('carts')
export class Cart {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt?: Date;
}
