import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { Listing } from "./Listing";

@Entity()
export class ListingPhoto {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  imgUrl!: string;

  @Index()
  @Column({ type: "char", length: 36 })
  listingId!: string;

  @ManyToOne(() => Listing, (listing) => listing.photos, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "listingId" })
  listing!: Listing;
}
