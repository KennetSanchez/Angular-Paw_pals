import { Routes } from '@angular/router';
import { MainComponent } from './domains/pages/main/main.component';
import { NoPageComponent } from './domains/pages/no-page/no-page.component';
import { MyPetsComponent } from './domains/pages/my-pets/my-pets.component';
import { PetFormComponent } from './domains/pages/pet-form/pet-form.component';

export const routes: Routes = [
  
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: 'my-pets',
    component: MyPetsComponent,
  },
  {
    path: 'profile',
    component: MyPetsComponent,
  },
  {
    path: 'pet-addition-form',
    component: PetFormComponent,
  },
  
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'/home'
  },
  {
    path: '**',
    component: NoPageComponent,
  },
];
