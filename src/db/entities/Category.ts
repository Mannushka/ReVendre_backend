import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Listing } from "./Listing";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column()
  title!: string;

  @Column()
  color!: string;

  @Column()
  iconName!: string;

  @OneToMany(() => Listing, (listing) => listing.categoryId)
  listings!: Listing[];
}
