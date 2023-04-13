import express from "express";
import * as dotenv from "dotenv";
import dalleRoutes from "./routes/dalle.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limig: "50mb" }));

app.use("/", dalleRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Dalle.E" });
});
app.listen(8080, () => console.log("Server started"));
