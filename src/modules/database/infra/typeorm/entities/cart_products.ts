import { PrimaryColumn, Entity, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Cart } from '@/modules/database/infra/typeorm/entities/carts';
import { Product } from '@/modules/database/infra/typeorm/entities/products';

@Entity('cart_products')
export class CartProduct {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { cascade: true })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'quantity' })
  quantity: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt?: Date;
}
