import { Pet } from "./Pet";

export interface User{
    id:'',
    name: '',
    hashedPassword:'',
    phoneNumber:'',
    email:'',
    pets: Pet[],
}