import express, { type Router, type Request, type Response } from "express"; //cambio por que estamos usando pnpm
import type {
  Estudiante,
  crearEstudiante,
  actualizarEstudiante,
  estudianteFiltrado,
} from "../index.js";

const router: Router = express.Router(); //cambio por que estamos usando pnpm

let estudiantes: Estudiante[] = [];

// las rutas van aquí

router.get("/", async function (req: Request, res: Response) {
  res.json(estudiantes);
});

router.post(
  "/",
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

router.put("/:id", function (req: Request, res: Response) {
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

router.delete("/:id", function (req: Request, res: Response) {
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

//===========APLICANDO FILTROS==============
router.get(
  "/",
  function (req: Request<{}, {}, {}, estudianteFiltrado>, res: Response) {
    const { bootcamp } = req.query;
    let resultado = [...estudiantes];

    //FILTRO PARA EL NOMBRE DEL PRODUCTO
    if (bootcamp) {
      resultado = resultado.filter(
        (e) => e.bootcamp.toLowerCase() === bootcamp.toLowerCase(),
      );
    }
    // mostrar el resultado filtrado
    return res.json({
      total: resultado.length,
      datos: resultado,
    });
  },
);

//endpoint id especifico
router.get("/:id", async function (req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  const encontrado = estudiantes.filter((e) => e.id === idBuscado);
  if (encontrado.length > 0) {
    res.json(encontrado);
  } else {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }
});

export default router;
