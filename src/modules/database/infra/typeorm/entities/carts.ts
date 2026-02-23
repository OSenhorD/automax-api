import { PrimaryColumn, Entity, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { User } from '@/modules/database/infra/typeorm/entities/users';
import { CartProduct } from '@/modules/database/infra/typeorm/entities/cart_products';

@Entity('carts')
export class Cart {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  items: CartProduct[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
