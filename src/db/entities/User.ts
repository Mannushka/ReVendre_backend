import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Listing } from "./Listing";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  clerkId!: string;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phoneNumber!: string | null;

  @Column({ nullable: true })
  imageUrl!: string | null;

  @OneToMany(() => Listing, (listing) => listing.user)
  listings!: Listing[];
}
