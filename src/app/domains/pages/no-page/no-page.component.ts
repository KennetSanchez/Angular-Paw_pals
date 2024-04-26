import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.css',
})
export class NoPageComponent {
  private router = inject(Router);

  redirectToHome() {
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 5000);
  }
}
