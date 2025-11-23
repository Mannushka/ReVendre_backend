import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./db/entities/User";
// import { Listing } from "./db/entities/Listing";
// import { ListingPhoto } from "./db/entities/ListingPhoto";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["src/db/entities/*.ts"],
  migrations: ["src/db/migrations/*.ts"],
  subscribers: ["src/subscriber/*.ts"],
});
