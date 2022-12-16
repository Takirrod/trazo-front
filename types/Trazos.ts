import { type } from "os";

export type TrazoHome = {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadPasos: number;
  pasoActual: number;
  nombrePasos: string[];
};

export type TrazoCreate = {
  nombre: string;
  cantidadPasos?: number;
  descripcion: string;
  estaTerminado: boolean;
  pasoActual?: number;
  idUsuario: number;
  idRol: number;
  paso: [
    {
      nombre: string;
      descripcion: string;
      estaTerminado: boolean;
      pasoNumero: number;
      idUsuario: number;
      idRol: number;
      idTrazo: number;
    }
  ];
};
