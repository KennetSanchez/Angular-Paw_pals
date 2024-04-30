import { Component, inject, signal } from '@angular/core';
import { UserFormComponent } from '../../shared/user-form/user-form.component';
import { User } from '../../const/User';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { aReallyCoolAndActualHash } from '../../utils/tools';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [UserFormComponent],
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
      let user: User = event;

      const logged = await this.userService.login(
        user.email,
        user.hashedPassword
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
