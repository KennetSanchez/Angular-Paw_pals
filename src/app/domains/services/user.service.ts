import { Injectable } from '@angular/core';
import { User } from '../const/User';
import { aReallyCoolAndActualHash, delayOnPurpose } from '../utils/tools';
import { Owner } from '../const/Owner';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      isFirstTime: true,
      id: 'o1',
      name: 'Ignacio',
      hashedPassword: 'hashMeThis12345678sihTeMhsah',
      phoneNumber: '+34613096754',
      email: 'ignaPro@gmail.com',
      petsIds: ['p1', 'p2'],
    },
    {
      isFirstTime: true,
      id: 'o2',
      name: 'Iñaki',
      hashedPassword: 'hashMeThis12345678sihTeMhsah',
      phoneNumber: '+34613096314',
      email: 'inaPro@gmail.com',
      petsIds: ['p3'],
    },
    {
      isFirstTime: true,
      id: 'o3',
      name: 'zehcnaS tenneK',
      hashedPassword: 'hashMeThis12345678sihTeMhsah',
      phoneNumber: '+34123456789',
      email: 'kesasaro@gmail.com',
      petsIds: [],
    },
    {
      isFirstTime: true,
      id: 'o4',
      name: 'ADMIN',
      hashedPassword: 'hashMeThis12345678sihTeMhsah',
      phoneNumber: '+34123456789',
      email: 'aRealAdmin@pawPals.com',
      petsIds: [],
    },
  ];

  constructor() {
    if (localStorage.getItem('users') === undefined) {
      this.saveData();
    }
  }

  async addUser(newUser: User): Promise<boolean> {
    this.loadData();
    const user = this.users.find((user) => user.email === newUser.email);
    
    if (user) {
      return delayOnPurpose(false);
    } else {
      this.users.push(newUser);
      this.saveData();
      return delayOnPurpose(true);
    }
  }

  async getUserById(id: string): Promise<User | undefined> {
    this.loadData();
    let user = this.users.find((user) => user.id === id);
    return delayOnPurpose(user);
  }

  async getUserInfo(id: string): Promise<Owner> {
    this.loadData();
    let user = this.users.find((user) => user.id === id);

    // Can't be null since someone had to create the pet.
    let info: Owner = {
      ownersName: user!.name,
      ownersPhone: user!.phoneNumber,
      ownersEmail: user!.email,
    };
    return delayOnPurpose(info);
  }

  async login(email: string, hashedPassword: string) {
    this.loadData();
    let wasSuccessful: boolean = false;
    this.users.filter((currentUser) => {
      if (
        email === currentUser.email &&
        hashedPassword === currentUser.hashedPassword
      ) {
        currentUser.isFirstTime = false;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        wasSuccessful = true;
      } else {
        return;
      }
    });
    return delayOnPurpose(wasSuccessful);
  }

  async updateUser(
    id: string,
    name: string,
    password: string,
    email: string,
    phoneNumber: string
  ) {
    this.loadData();
    const oldUser = this.users.filter((user) => user.id === id)[0];
    const updatedUser: User = {
      isFirstTime: false,
      id: id,
      name: name,
      hashedPassword: aReallyCoolAndActualHash(password),
      phoneNumber: phoneNumber,
      email: email,
      petsIds: oldUser.petsIds,
    };

    this.users.map((user) => {
      user.id === id ? updatedUser : user;
    });
    this.saveData();
  }

  private loadData() {
    return JSON.parse(localStorage.getItem('users')!);
  }

  private saveData() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
