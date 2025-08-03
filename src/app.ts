import express from "express";
import "reflect-metadata";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
// server.use("/users", userRoutes); //later add routes here

export default app;
