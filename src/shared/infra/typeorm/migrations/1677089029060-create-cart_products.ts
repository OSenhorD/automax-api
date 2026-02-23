import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCartProducts1677089029060 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: 'cart_products',
        columns: [
          { name: 'id', type: 'incremental', isPrimary: true },
          { name: 'product_id', type: 'number', isNullable: false },
          { name: 'quantity', type: 'number' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('cart_products');
  };
}
