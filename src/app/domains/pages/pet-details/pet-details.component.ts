import { Component, inject, signal } from '@angular/core';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../const/Pet';
import { PetService } from '../../services/pet.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css',
  imports: [PetFormComponent, LoadingComponent],
})
export class PetDetailsComponent {
  pet = signal({} as Pet | undefined);
  isLoading = signal(false);
  router = new Router();
  petsService = inject(PetService);
  usersService = inject(UserService);

  private userId: string = '';
  private petId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading.set(true);
    this.loadData();
  }

  async loadData() {
    this.petId = this.route.snapshot.paramMap.get('id') + '';
    this.userId = await this.usersService.getCurrentUserId();
    let petFound = await this.petsService.getPetById(this.petId);
    this.pet.set(petFound);
    this.isLoading.set(false);
    return;
  }

  async updatePet(event: any) {
    if (event) {
      this.isLoading.set(true);
      let pet: Pet = event;

      await this.petsService.updatePet(
        this.petId,
        this.userId,
        pet.name,
        pet.breed,
        pet.age,
        pet.weight,
        pet.height,
        pet.description,
        pet.location
      );
    }
    this.router.navigate(['my-pets']);
    this.isLoading.set(false);
  }
}
