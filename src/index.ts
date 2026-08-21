import express from "express";
import type { Request, Response } from "express";
import estudiantesRouter from "./routes/estudiantes.js";
import fs from "node:fs/promises";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../src/swagger_output.json" with { type: "json" };
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;
const NODE_ENV = process.env.NODE_ENV;
const API_KEY = process.env.API_KEY;

app.use(cors());
//MIDDLEWARE
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get("/", function (req: Request, res: Response) {
  res.send("El servidor esta en pie");
});

app.get("/api/status", async (req: Request, res: Response) => {
  const datos = await fs.readFile("src/status.json", "utf-8");
  const status = JSON.parse(datos);

  res.json(status);
});

app.use("/api/estudiantes", estudiantesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
