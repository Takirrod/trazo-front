import { type } from "os";
export type Rol = {
  id: number;
  nombre: string;
  descripcion: string;
  esPublico: boolean;
};

export type ActualizarRols ={
  idUsuario: number,
  roles: number[]
}