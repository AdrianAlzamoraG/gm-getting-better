import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1652800321507 implements MigrationInterface {
  name = 'InitialSchema1652800321507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`offers\` (\`title\` varchar(600) NOT NULL, \`description\` varchar(700) NOT NULL, \`pricePerIndividualSession\` NOT NULL, \`pricePerGroupSession\`  NOT NULL, \`typeMoney\` varchar(100) NOT NULL, \`statusPublication\` tinyint NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`announcements\``);
  }
}
