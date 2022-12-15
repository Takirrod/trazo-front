import { type } from "os";

export type TrazoHome = {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadPasos: number;
  pasoActual: number;
  nombrePasos: string[];
};
