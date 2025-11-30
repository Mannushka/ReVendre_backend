import express from "express";
import "reflect-metadata";
import userRoutes from "./routes/user.routes";
import listingRoutes from "./routes/listing.routes";
import listingPhotoRoutes from "./routes/listingPhoto.routes";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true })); // limit allowed origins later!
app.use(express.json());
app.use(clerkMiddleware());
app.use("/users", userRoutes);
// server.use("/users", userRoutes); //later add routes here
app.use("/listings", listingRoutes);
app.use("/listing-photos", listingPhotoRoutes);

export default app;
