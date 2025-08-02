import app from "./app";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
// import * as dotenv from "dotenv";
// dotenv.config(); // Loads .env into process.env

const PORT = 3000;
AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await AppDataSource.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );

    console.log("DB_DATABASE:", process.env.DB_DATABASE);
    console.log("DB_HOST", process.env.DB_HOST);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
