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
    token: string,
    idUsuario: number,
    roles: number[]
  };