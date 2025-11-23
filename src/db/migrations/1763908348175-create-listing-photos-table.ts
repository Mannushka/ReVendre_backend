import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateListingPhotosTable1763908348175
  implements MigrationInterface
{
  name = "CreateListingPhotosTable1763908348175";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`listing_photo\` (\`id\` varchar(36) NOT NULL, \`imgUrl\` varchar(255) NOT NULL, \`listingId\` varchar(36) NOT NULL, INDEX \`IDX_ac1f85a49aa0f94364fa10e723\` (\`listingId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_33bd8a3b7eeccb95ae45038d956\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_33bd8a3b7eeccb95ae45038d95\` ON \`listing\``
    );
    await queryRunner.query(`ALTER TABLE \`listing\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`listing\` ADD \`userId\` varchar(36) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`listing\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 1`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_33bd8a3b7eeccb95ae45038d95\` ON \`listing\` (\`userId\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_33bd8a3b7eeccb95ae45038d956\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`listing_photo\` ADD CONSTRAINT \`FK_ac1f85a49aa0f94364fa10e7230\` FOREIGN KEY (\`listingId\`) REFERENCES \`listing\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`listing_photo\` DROP FOREIGN KEY \`FK_ac1f85a49aa0f94364fa10e7230\``
    );
    await queryRunner.query(
      `ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_33bd8a3b7eeccb95ae45038d956\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_33bd8a3b7eeccb95ae45038d95\` ON \`listing\``
    );
    await queryRunner.query(
      `ALTER TABLE \`listing\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE \`listing\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`listing\` ADD \`userId\` varchar(255) NOT NULL`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_33bd8a3b7eeccb95ae45038d95\` ON \`listing\` (\`userId\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_33bd8a3b7eeccb95ae45038d956\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ac1f85a49aa0f94364fa10e723\` ON \`listing_photo\``
    );
    await queryRunner.query(`DROP TABLE \`listing_photo\``);
  }
}
