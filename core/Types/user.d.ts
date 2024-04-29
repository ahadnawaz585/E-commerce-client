import { Role } from "../enums/role";
export interface User {
  id?: string;
  username: string;
  password: string;
  email:string;
  rememberMe?:boolean;
  otp?: number
  role?: Role|string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Date;
}
