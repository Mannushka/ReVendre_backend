import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryIdColumnToListingsTable1765118615843
  implements MigrationInterface
{
  name = "AddCategoryIdColumnToListingsTable1765118615843";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`listing\` ADD \`categoryId\` varchar(36)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_2bbfb12dc1f8dc97c66afa6fe4\` ON \`listing\` (\`categoryId\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_2bbfb12dc1f8dc97c66afa6fe4c\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_2bbfb12dc1f8dc97c66afa6fe4c\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2bbfb12dc1f8dc97c66afa6fe4\` ON \`listing\``
    );
    await queryRunner.query(
      `ALTER TABLE \`listing\` DROP COLUMN \`categoryId\``
    );
  }
}
