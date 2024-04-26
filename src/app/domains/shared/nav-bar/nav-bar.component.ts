import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private router = inject(Router);
  
  navigateToHome(){
    this.router.navigate(['home']);
  }

  navigateToPets(){
    this.router.navigate(['pets']);
  }

  navigateToProfile(){
    this.router.navigate(['profile']);
  }
}
