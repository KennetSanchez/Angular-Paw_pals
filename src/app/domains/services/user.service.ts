import { Injectable } from '@angular/core';
import { User } from '../const/User';
import { delayOnPurpose } from '../utils/tools';
import { Owner } from '../const/Owner';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      id: 'o1',
      name: 'Ignacio',
      hashedPassword: 'asdasdasd12312312edasasda',
      phoneNumber: '+34613096754',
      email: 'ignaPro@gmail.com',
      petsIds: ['p1', 'p2']
    },{
      id: 'o2',
      name: 'Iñaki',
      hashedPassword: 'asda123123sdasd12312312edasasda',
      phoneNumber: '+34613096314',
      email: 'inaPro@gmail.com',
      petsIds: ['p3']
    }
  ];

  async addUser() {
    const hashedPassword = '';

    const newUser: User = {
      id: '',
      name: '',
      hashedPassword: hashedPassword,
      email: '',
      phoneNumber: '',
      petsIds: [],
    };

    delayOnPurpose({}).then(() => {
      this.users.push(newUser);
    });
  }

  async getUserById(id: string): Promise<User | undefined> {
    let user = this.users.find((user) => user.id === id);
    return delayOnPurpose(user);
  }

  async getUserInfo(id: string): Promise<Owner> {
    let user = this.users.find((user) => user.id === id);
    
    // Can't be null since someone had to create the pet.
    let info: Owner = {
      ownersName: user!.name,
      ownersPhone: user!.phoneNumber,
      ownersEmail: user!.email,
    };
    return delayOnPurpose(info);
  }
}
