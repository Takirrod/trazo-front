import { type } from "os";

export type TrazoHome = {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadPasos: number;
  pasoActual: number;
  nombrePasos: string[];
  estaTerminado?: boolean;
  idUsuario?: number;
  idRol?: number;
};

export type TrazoCreate = {
  nombre: string;
  cantidadPasos?: number;
  descripcion: string;
  estaTerminado: boolean;
  pasoActual?: number;
  idUsuario: number | null;
  idRol: number | null;
  paso: {
    nombre: string;
    descripcion: string;
    estaTerminado: boolean;
    pasoNumero: number;
    idUsuario: number | null;
    idRol: number;
    idTrazo: number;
  }[] | Paso[];
};

export type Paso = {
  nombre: string;
  descripcion: string;
  estaTerminado: boolean;
  pasoNumero: number;
  idUsuario: number | null;
  idRol: number| null;
  idTrazo: number;
};

export type TrazoGuardado = {
  id: number;
  nombre: string;
  cantidadPasos: number;
  descripcion: string;
  pasoGuardado?: {
    id: number;
    nombre: string;
    descripcion: string;
    pasoNumero: number;
    idRol: number;
    idTrazoGuardado: number;
  }[];
};

export type TrazoPasos = {
  nombre: string;
  descripcion: string;
  estaTerminado: boolean;
  pasoNumero: number;
  idUsuario: number;
  idRol: number;
  idTrazo: number;
};

export type Trazo = {
  id: number;
  nombre: string;
  cantidadPasos: number;
  descripcion: string;
  estaTerminado: boolean;
  pasoActual: number;
  idUsuario: number;
  idRol: number;
  paso: [
    {
      id: number;
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

export type TrazoNew = {
  nombrePaso: string;
  descripcion: string;
  personaAsignada: string;
};
