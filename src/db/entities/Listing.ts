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

  @OneToMany(() => ListingPhoto, (photo) => photo.listing, { cascade: false })
  photos!: ListingPhoto[];
}
