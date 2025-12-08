import { MigrationInterface, QueryRunner } from "typeorm";
import { randomUUID } from "crypto";

export class PopulateCategoriesTable1765202254395
  implements MigrationInterface
{
  name = "PopulateCategoriesTable1765202254395";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const rows = [
      ["Furniture", "#fc5c65", "floor-lamp"],
      ["Cars", "#fd9644", "car"],
      ["Electronics", "#fed330", "laptop"],
      ["Games", "#26de81", "microsoft-xbox-controller"],
      ["Clothing & shoes", "#2bcbba", "shoe-heel"],
      ["Sports", "#45aaf2", "basketball"],
      ["Movies & music", "#4b7bec", "headphones"],
      ["Books", "#8f71ff", "book-open-page-variant"],
      ["Others", "#82acff", "duck"],
    ] as const;
    for (const [title, color, iconName] of rows) {
      const id = randomUUID();
      await queryRunner.query(
        "INSERT INTO `category` (`id`, `title`, `color`, `iconName`) VALUES (?, ?, ?, ?)",
        [id, title, color, iconName]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`category\` WHERE \`title\` IN ('Furniture', 'Cars', 'Electronics', 'Games', 'Clothing & shoes', 'Sports', 'Movies & music', 'Books', 'Others')`
    );
  }
}
