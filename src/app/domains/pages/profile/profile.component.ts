import { Component, inject, signal } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../const/User';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [UserFormComponent, LoadingComponent]
})
export class ProfileComponent {
  router = inject(Router);
  usersService = inject(UserService);
  isLoading = signal(false);
  user = signal({} as User | undefined);

  ngOnInit() {
    this.isLoading.set(true);
    this.loadData();
  }

  async loadData(){
    const userId = await this.usersService.getCurrentUserId();
    const userFound = await this.usersService.getUserById(userId);
    this.user.set(userFound);
    this.isLoading.set(false);
    console.log(this.user());
  }

  async updateProfile(event: any) {
    if (event) {
      this.isLoading.set(true);

      let newUser: User = event;
      await this.usersService.updateUser(newUser);
      this.isLoading.set(false);
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
