import { Component, inject, signal } from '@angular/core';
import { User } from '../../const/User';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginFormComponent } from "../login-form/login-form.component";
import { Credentials } from '../../const/Credentials';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [LoginFormComponent, LoadingComponent]
})
export class LoginComponent {
  user = signal({} as User);
  isLoading = signal(false);
  router = inject(Router);

  userService = inject(UserService);
  
  async login(event: any) {
    if (event) {
      this.isLoading.set(true);
      let credentials: Credentials = event;

      const [logged, isNew] = await this.userService.login(
        credentials.email,
        credentials.password,
      );

      this.isLoading.set(false);

      if (logged && isNew) {
        this.router.navigate(['introduction']);
      } else if(logged){
        this.router.navigate(['home']);
      } else {
        alert('Credenciales incorectas');
      }
    }else{
      this.router.navigate(['register'])
    }
  }
}
