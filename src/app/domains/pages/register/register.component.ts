import { Component, inject, signal } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../const/User';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [UserFormComponent, LoadingComponent]
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
      if (created) {
        this.router.navigate(['home']);
      } else {
        alert('Hubo un problema al crear la cuenta. El correo parece estar en uso');
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
