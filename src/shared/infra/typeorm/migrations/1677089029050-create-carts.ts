import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarts1677089029050 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: 'carts',
        columns: [
          { name: 'id', type: 'incremental', isPrimary: true },
          { name: 'user_id', type: 'number', isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('carts');
  };
}
