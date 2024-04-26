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
        console.log("Init");
        this.loadData();
    }

    constructor(){
        console.log("AAAAAAAAAAAAAAAAAAAA");
        this.loadData();
        this.petServices.addPet('Adicional', 'Pug', 12, 90, 90, 'Por favor duermanlo', 'El infierno');
        this.petServices.updatePet('p1', 'o1', 'Actualizado', 'fila', 12, 90, 90, 'Por favor duermanlo', 'El infierno')
    }

    async loadData(){
        const pets = await this.petServices.getPets();
        console.log("Objeto servicio: ", pets);
        this.pets.set(pets);
    }
}
