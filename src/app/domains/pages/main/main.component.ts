import { Component, inject, Signal, signal } from '@angular/core';
import { PetCardComponent } from "../pet-card/pet-card.component";
import { PetService } from '../../services/pet.service';
import { Pet } from '../../const/Pet';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [PetCardComponent]
})
export class MainComponent {
    petServices = inject(PetService);
    pets = signal([] as Pet[]);

    ngOnInit(){
        this.loadData();
    }

    constructor(){
        this.loadData();
    }

    async loadData(){
        const pets = await this.petServices.getPets();
        this.pets.set(pets);
    }
}
