import { Component, inject, signal } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../const/Pet';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { PetFormComponent } from '../pet-form/pet-form.component';

@Component({
  selector: 'app-my-pets',
  standalone: true,
  templateUrl: './my-pets.component.html',
  styleUrl: './my-pets.component.css',
  imports: [PetFormComponent, PetCardComponent],
})
export class MyPetsComponent {

  private petsService = inject(PetService);
  private USER_ID = 'o1';
  myPets = signal([] as Pet[]);
  isAddingPet = signal(false);

  dummyPet : any = {
  }

  ngOnInit() {
    this.loadData();
    console.log(this.dummyPet);
  }

  async loadData() {
    const pets = await this.petsService.getPetsByOwnerId(this.USER_ID);
    this.myPets.set(pets);
  }

  showForm(){
    this.isAddingPet.set(true);
  }

  async addPet(event:any){
    if(event){
      let pet : Pet = event;
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
      this.loadData().then(
        () => {this.isAddingPet.set(false)}
      );
      console.log(this.petsService.getPetsByOwnerId(this.USER_ID));
    }
  }
}
