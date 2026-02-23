import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1677089029040 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      })
    );
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('products');
  };
}
