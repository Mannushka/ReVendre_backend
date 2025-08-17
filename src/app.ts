import express from "express";
import "reflect-metadata";
import userRoutes from "./routes/user.routes";

const app = express();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true })); // limit allowed origins later!
app.use(express.json());

app.use("/users", userRoutes);
// server.use("/users", userRoutes); //later add routes here

export default app;
