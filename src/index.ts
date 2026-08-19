import express from "express";
import type { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const PORT = 3000;

//MIDDLEWARE
app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

let estudiantes: Estudiante[] = [];

app.get("/", function (req: Request, res: Response) {
  res.send("El servidor esta en pie");
});

app.get("/api/status", async (req: Request, res: Response) => {
  const datos = await fs.readFile("src/status.json", "utf-8");
  const status = JSON.parse(datos);

  res.json(status);
});

app.get("/estudiantes", async function (req: Request, res: Response) {
  res.json(estudiantes);
});

//endpoint id especifico
app.get("/estudiantes/:id", async function (req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  const encontrado = estudiantes.filter((e) => e.id === idBuscado);
  if (encontrado.length > 0) {
    res.json(encontrado);
  } else {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }
});

//CREAR UN ESTUDIANTE NUEVO METODO POST
interface crearEstudiante {
  nombre: string;
  email: string;
  bootcamp: string;
}

app.post(
  "/estudiantes",
  function (req: Request<{}, {}, crearEstudiante>, res: Response) {
    const { nombre, email, bootcamp } = req.body;
    if (!nombre || !email || !bootcamp) {
      return res
        .status(400)
        .json({ error: "faltan datos que son obligatorios" });
    }
    const nuevoEstudiante: Estudiante = {
      id: estudiantes.length > 0 ? estudiantes.length + 1 : 1,
      nombre,
      email,
      bootcamp,
    };
    estudiantes.push(nuevoEstudiante);
    res.status(201).json(nuevoEstudiante);
  },
);

//Actualizar estudiante
interface actualizarEstudiante {
  nombre: string;
  email: string;
  bootcamp: string;
}

app.put("/estudiantes/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const index = estudiantes.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  } else {
    const { nombre, email, bootcamp }: actualizarEstudiante = req.body;

    estudiantes[index] = {
      id: idBuscado,
      nombre: nombre ?? estudiantes[index]?.nombre,
      email: email ?? estudiantes[index]?.email,
      bootcamp: bootcamp ?? estudiantes[index]?.bootcamp,
    };
    res.json(estudiantes[index]);
  }
});

//eliminar estudiante
app.delete("/estudiantes/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const index = estudiantes.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "estudiante no encontrado no podemos eliminarlo" });
  } else {
    estudiantes = estudiantes.filter((e) => e.id !== idBuscado);
    res.json({ mensaje: "ESTUDIANTE ELIMINADO EXITOSAMENTE" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
