import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriesTable1765102621187 implements MigrationInterface {
  name = "CreateCategoriesTable1765102621187";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`iconName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
