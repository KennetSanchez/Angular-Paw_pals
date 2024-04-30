import { Pet } from "./Pet";

export interface User{
    isFirstTime: boolean,
    id:string,
    name: string,
    hashedPassword:string,
    phoneNumber:string,
    email:string,
    petsIds: string[],
}