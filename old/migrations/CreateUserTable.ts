/* eslint-disable class-methods-use-this */
import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ADMIN_USER, HASH_SALT } from '../common/constants';
import { User } from '../resources/users/user.model';

export class CreateUserTable1642321903527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true
    );

    const adminUser = await queryRunner.manager.create(User, {
      ...ADMIN_USER,
      password: await hash(ADMIN_USER.password, HASH_SALT),
    });
    await queryRunner.manager.save(adminUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User', true);
  }
}
