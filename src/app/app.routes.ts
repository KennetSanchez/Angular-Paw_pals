import { Routes } from '@angular/router';
import { MainComponent } from './domains/pages/main/main.component';
import { NoPageComponent } from './domains/pages/no-page/no-page.component';
import { MyPetsComponent } from './domains/pages/my-pets/my-pets.component';
import { PetDetailsComponent } from './domains/pages/pet-details/pet-details.component';

export const routes: Routes = [
  
  {
    path: 'home',
    title: 'Inicio',
    component: MainComponent,
  },
  {
    path: 'my-pets',
    title: 'Mis mascotas',
    component: MyPetsComponent,
  },
  {
    path: 'my-pets/:id',
    title: 'Detalle mascota',
    component: PetDetailsComponent,
},
  {
    path: 'profile',
    title: 'Mi perfil',
    component: MyPetsComponent,
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
