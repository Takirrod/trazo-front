import { type } from "os";

export type UserRegister = {
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  urlPerfil: string;
  idRol: number[];
  token?: string;
};

export type UserRegisterRes = {
  token: string;
  idUsuario: number;
  roles: number[];
};

export type User = {
  id: number;
  email: string;
  usuario: string;
  nombre: string;
  apellido: string;
  activo: boolean;
  urlPerfil: string;
};
