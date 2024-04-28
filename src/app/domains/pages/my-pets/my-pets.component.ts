import { Component, inject, signal } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../const/Pet';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { Owner } from '../../const/Owner';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
    selector: 'app-my-pets',
    standalone: true,
    templateUrl: './my-pets.component.html',
    styleUrl: './my-pets.component.css',
    imports: [PetFormComponent, PetCardComponent, LoadingComponent]
})
export class MyPetsComponent {
  private petsService = inject(PetService);
  private usersService = inject(UserService);

  private USER_ID = 'o1';

  petsAndOwners = signal([] as (Pet | Owner)[][]);
  isAddingPet = signal(false);
  isLoading = signal(true);

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const pets = await this.petsService.getPetsByOwnerId(this.USER_ID);
    const owner = await this.usersService.getUserInfo(this.USER_ID);
    const petAndOwner = pets.map((pet) => {
      return [pet, owner];
    })
    this.petsAndOwners.set(petAndOwner);
    this.isLoading.set(false);
  }

  showForm() {
    this.isAddingPet.set(true);
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
        this.USER_ID
      );
      this.loadData().then(() => {
        this.isLoading.set(false);
        this.isAddingPet.set(false);
      });
    } else {
      this.isAddingPet.set(false);
    }
  }
}
