import { Component, inject, signal } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../const/User';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [UserFormComponent],
})
export class RegisterComponent {
  isLoading = signal(false);
  router = inject(Router);
  usersService = inject(UserService);

  async signUp(event: any) {
    if (event) {
      this.isLoading.set(true);

      let newUser: User = event;
      const created = await this.usersService.addUser(newUser);
      this.isLoading.set(false);
    console.log(created);
      if (created) {
        this.router.navigate(['home']);
      } else {
        alert('Hubo un problema al crear la cuenta. El correo parece estar en uso');
      }
    } else {
      this.router.navigate(['register']);
    }
  }
}
