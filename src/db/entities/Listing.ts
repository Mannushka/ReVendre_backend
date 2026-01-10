import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { ListingPhoto } from "./ListingPhoto";
import { Category } from "./Category";

@Entity()
export class Listing {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Index()
  @Column({ type: "char", length: 36 })
  categoryId!: string;

  @Index()
  @Column({ type: "char", length: 36 })
  userId!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.listings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Category, (category) => category.listings, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "categoryId" })
  categoryEntity!: Category;

  @OneToMany(() => ListingPhoto, (photo) => photo.listing, { cascade: false })
  photos!: ListingPhoto[];
}
