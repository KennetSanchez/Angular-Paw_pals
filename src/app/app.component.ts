import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./domains/pages/main/main.component";
import { NavBarComponent } from "./domains/shared/nav-bar/nav-bar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MainComponent, NavBarComponent]
})
export class AppComponent {
  title = 'Paw_pals';
}
