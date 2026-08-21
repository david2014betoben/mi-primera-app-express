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
