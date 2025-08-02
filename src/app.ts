import express from "express";
import "reflect-metadata";
//import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());
// server.use("/users", userRoutes); //later add routes here

// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello, TypeScript with Express!");
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
export default app;
