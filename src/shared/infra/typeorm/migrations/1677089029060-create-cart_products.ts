import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCartProducts1677089029060 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: 'cart_products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'cart_id', type: 'integer', isNullable: false },
          { name: 'product_id', type: 'integer', isNullable: false },
          { name: 'quantity', type: 'integer' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            referencedTableName: 'carts',
            referencedColumnNames: ['id'],
            columnNames: ['cart_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        indices: [
          {
            columnNames: ['cart_id', 'product_id'],
            isUnique: true,
          },
        ],
      })
    );
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('cart_products');
  };
}
