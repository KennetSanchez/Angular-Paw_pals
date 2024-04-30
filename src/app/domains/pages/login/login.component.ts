import { Component, inject, signal } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../const/User';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginFormComponent } from "../login-form/login-form.component";
import { Credentials } from '../../const/Credentials';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [UserFormComponent, LoginFormComponent]
})
export class LoginComponent {
  user = signal({} as User);
  isLoading = signal(false);
  router = new Router();

  userService = inject(UserService);

  constructor() {}

  async login(event: any) {
    if (event) {
      this.isLoading.set(true);
      let credentials: Credentials = event;

      const logged = await this.userService.login(
        credentials.email,
        credentials.password,
      );
      
      this.isLoading.set(false);

      if (logged) {
        this.router.navigate(['home']);
      } else {
        alert('Credenciales incorectas');
      }
    }
  }
}
