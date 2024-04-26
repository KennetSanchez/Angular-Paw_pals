import { Routes } from '@angular/router';
import { MainComponent } from './domains/pages/main/main.component';
import { PetAdditionComponent } from './domains/pages/pet-addition/pet-addition.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'/home'
  },
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: 'my-pets',
    component: PetAdditionComponent,
  },
];
