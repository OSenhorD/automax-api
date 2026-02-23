import { PrimaryColumn, Entity, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Product } from '@/modules/database/infra/typeorm/entities/products';

@Entity('cart_products')
export class CartProduct {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @ManyToOne(() => Product, { nullable: false, eager: true })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  productId: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt?: Date;
}
