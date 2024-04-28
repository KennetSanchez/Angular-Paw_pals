import { Pet } from "./Pet";

export interface User{
    id:string,
    name: string,
    hashedPassword:string,
    phoneNumber:string,
    email:string,
    petsIds: string[],
}