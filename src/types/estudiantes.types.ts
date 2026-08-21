interface Estudiante {
  id: number;
  name: string;
  email: string;
  bootcamp: string;
}

interface crearEstudiante {
  name: string;
  email: string;
  bootcamp: string;
}

interface actualizarEstudiante {
  name: string;
  email: string;
  bootcamp: string;
}

interface estudianteFiltrado {
  bootcamp?: string;
  name?: string;
  email?: string;
}

export type {
  Estudiante,
  crearEstudiante,
  actualizarEstudiante,
  estudianteFiltrado,
};
