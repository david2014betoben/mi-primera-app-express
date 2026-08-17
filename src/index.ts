import express from "express";
import type { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const PORT = 3000;

async function obtenerDatos(): Promise<string> {
  const ruta = path.resolve("src/status.json");
  const texto = await fs.readFile(ruta, "utf-8");
  return JSON.parse(texto);
}

app.get("/", function (req: Request, res: Response) {
  res.send("El servidor esta en pie");
});

app.get("/api/status", async (req: Request, res: Response) => {
  const datos = await fs.readFile("src/status.json", "utf-8");
  const status = JSON.parse(datos);

  res.json(status);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
