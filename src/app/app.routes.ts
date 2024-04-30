import { Routes } from '@angular/router';
import { MainComponent } from './domains/pages/main/main.component';
import { NoPageComponent } from './domains/pages/no-page/no-page.component';
import { MyPetsComponent } from './domains/pages/my-pets/my-pets.component';
import { PetDetailsComponent } from './domains/pages/pet-details/pet-details.component';
import { ProfileComponent } from './domains/pages/profile/profile.component';
import { LoginComponent } from './domains/pages/login/login.component';
import { sessionGuardGuard } from './domains/guardians/session-guard.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión',
    component: LoginComponent,
  },
  {
    path: '',
    canActivateChild: [sessionGuardGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        title: 'Inicio',
        component: MainComponent,
      },
      {
        path: 'profile',
        title: 'Mi perfil',
        component: ProfileComponent,
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
    ],
  },
  {
    path: 'papu',
    component: NoPageComponent,
  },
  
];
