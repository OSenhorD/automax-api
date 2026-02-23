import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1677089029030 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'incremental', isPrimary: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      })
    );
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('users');
  };
}
