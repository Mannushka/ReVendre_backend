import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateListingsTable1763898490983 implements MigrationInterface {
    name = 'CreateListingsTable1763898490983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`listing\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` decimal(10,2) NOT NULL, \`userId\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_33bd8a3b7eeccb95ae45038d95\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_33bd8a3b7eeccb95ae45038d956\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_33bd8a3b7eeccb95ae45038d956\``);
        await queryRunner.query(`DROP INDEX \`IDX_33bd8a3b7eeccb95ae45038d95\` ON \`listing\``);
        await queryRunner.query(`DROP TABLE \`listing\``);
    }

}
