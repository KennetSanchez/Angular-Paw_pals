import { Component, inject, signal } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../const/Pet';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { Owner } from '../../const/Owner';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-pets',
  standalone: true,
  templateUrl: './my-pets.component.html',
  styleUrl: './my-pets.component.css',
  imports: [PetFormComponent, PetCardComponent, LoadingComponent],
})
export class MyPetsComponent {
  private petsService = inject(PetService);
  private usersService = inject(UserService);
  userId: string = '';

  petsAndOwners = signal([] as (Pet | Owner)[][]);
  isAddingPet = signal(false);
  isLoading = signal(true);
  router = inject(Router);

  async ngOnInit() {
    await this.loadData();
    this.isLoading.set(false);
  }

  async loadData() {
    this.userId = await this.usersService.getCurrentUserId();
    const pets = await this.petsService.getPetsByOwnerId(this.userId);
    const owner = await this.usersService.getUserInfo(this.userId);
    const petAndOwner = pets.map((pet) => {
      return [pet, owner];
    });
    this.petsAndOwners.set(petAndOwner);
  }

  showForm() {
    this.isAddingPet.set(true);
  }

  showDetail(petAndOwner: (Pet | Owner)[]) {
    const pet: Pet = petAndOwner[0] as Pet;
    const id = pet.petId;
    this.router.navigate([`my-pets/${id}`]);
  }

  async addPet(event: any) {
    if (event) {
      this.isLoading.set(true);
      let pet: Pet = event;
      await this.petsService.addPet(
        pet.name,
        pet.breed,
        pet.age,
        pet.weight,
        pet.height,
        pet.description,
        pet.location,
        this.userId
      );
    }
    await this.loadData();
    this.isLoading.set(false);
    this.isAddingPet.set(false);
  }
}
