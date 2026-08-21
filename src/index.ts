import express from "express";
import type { Request, Response } from "express";
import estudiantesRouter from "./routes/estudiantes.js";
import fs from "node:fs/promises";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../src/swagger_output.json" with { type: "json" };

const app = express();
const PORT = 3000;

//MIDDLEWARE
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

interface crearEstudiante {
  nombre: string;
  email: string;
  bootcamp: string;
}

interface actualizarEstudiante {
  nombre: string;
  email: string;
  bootcamp: string;
}

interface estudianteFiltrado {
  curso?: string;
  nombre?: string;
  email?: string;
}

export type {
  Estudiante,
  crearEstudiante,
  actualizarEstudiante,
  estudianteFiltrado,
};

export let estudiantes: Estudiante[] = [];

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
