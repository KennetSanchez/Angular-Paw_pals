import { Injectable } from '@angular/core';
import { User } from '../const/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];

  addUser(){
    const hashedPassword = '';
    
    const newUser : User = {
      id:'',
      name : '',
      hashedPassword: hashedPassword,
      email: '',
      phoneNumber: '',
      pets: []
    }
  }

  getUserById(id: string) : User | undefined {
    return this.users.find(user => user.id === id);
  }
}
