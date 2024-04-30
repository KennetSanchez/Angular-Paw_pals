import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
    selector: 'app-introduction',
    standalone: true,
    templateUrl: './introduction.component.html',
    styleUrl: './introduction.component.css',
    imports: [LoadingComponent]
})
export class IntroductionComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  isLoading = signal(false);

  async continue(){
    this.isLoading.set(true);
    await this.userService.wasWelcomed();
    this.router.navigate(['home']);
    this.isLoading.set(false);
  }
}
