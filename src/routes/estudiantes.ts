import express, { type Router, type Request, type Response } from "express"; //cambio por que estamos usando pnpm
import type {
  Estudiante,
  crearEstudiante,
  actualizarEstudiante,
  estudianteFiltrado,
} from "../index.js";
import { estudiantes } from "../index.js";

const router: Router = express.Router(); //cambio por que estamos usando pnpm

// las rutas van aquí

router.post(
  "/",
  function (req: Request<{}, {}, crearEstudiante>, res: Response) {
    // #swagger.description = 'Crea un nuevo estudiante'
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
  // #swagger.description = 'Actualiza los datos de un estudiante'
  /*#swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del estudiante a actualizar',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos a actualizar del estudiante',
      required: true,
      schema: {
        nombre: "Juan",
        email: "juan123@gmail.com",
        bootcamp: "fullstack"
      }
    }
  */
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
  // #swagger.description = 'Elimina a un estudiante'
  const idBuscado = Number(req.params.id);
  const index = estudiantes.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "estudiante no encontrado no podemos eliminarlo" });
  } else {
    estudiantes.splice(index, 1);
    res.json({ mensaje: "ESTUDIANTE ELIMINADO EXITOSAMENTE" });
  }
});

//===========APLICANDO FILTROS==============

router.get(
  "/",
  function (req: Request<{}, {}, {}, estudianteFiltrado>, res: Response) {
    // #swagger.description = 'Obtiene la lista de estudiantes con filtros opcionales'

    /*  #swagger.parameters['nombre'] = {
            in: 'query',
            description: 'Filtrar por nombre (insensible a mayúsculas)',
            type: 'string'
    } */
    /*  #swagger.parameters['email'] = {
            in: 'query',
            description: 'Filtrar por email exacto',
            type: 'string'
    } */
    /*  #swagger.parameters['curso'] = {
            in: 'query',
            description: 'filtrar por cursos',
            type: 'string'
    } */

    const { curso, nombre, email } = req.query;
    let resultado = [...estudiantes];
    if (nombre) {
      resultado = resultado.filter(
        (e) => e.nombre.toLowerCase() === nombre.toLowerCase(),
      );
    }
    if (email) {
      resultado = resultado.filter(
        (e) => e.email.toLowerCase() === email.toLowerCase(),
      );
    }
    if (curso) {
      resultado = resultado.filter(
        (e) => e.bootcamp.toLowerCase() === curso.toLowerCase(),
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
  // #swagger.description = 'Busca a un estudiante por su ID'
  let idBuscado = Number(req.params.id);
  const encontrado = estudiantes.filter((e) => e.id === idBuscado);
  if (encontrado.length > 0) {
    res.json(encontrado);
  } else {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }
});

export default router;
