import express from "express";
import "reflect-metadata";
import userRoutes from "./routes/user.routes";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true })); // limit allowed origins later!
app.use(express.json());
app.use(clerkMiddleware());
app.use("/users", userRoutes);
// server.use("/users", userRoutes); //later add routes here

export default app;
