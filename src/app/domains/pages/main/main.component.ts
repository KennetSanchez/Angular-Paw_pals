import { Component, inject, signal } from '@angular/core';
import { PetCardComponent } from "../pet-card/pet-card.component";
import { PetService } from '../../services/pet.service';
import { Pet } from '../../const/Pet';
import { Owner } from '../../const/Owner';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [PetCardComponent, LoadingComponent]
})
export class MainComponent {

    petsService = inject(PetService);
    usersService = inject(UserService);

    pets = [] as Pet[]
    owners = [] as Owner[];

    petsAndOwners = signal([] as (Pet | Owner)[][]);
    isLoading = signal(true);

    constructor(){
        this.loadData();
    }

    async loadData(){
        const pets = await this.petsService.getPets();
        
        const promises = pets.map(async (pet)=>{
            const owner = await this.getOwnerInfo(pet.ownerId);
            return [pet, owner];
        })

        const petsAndOwners = await Promise.all(promises);
        this.petsAndOwners.set(petsAndOwners);
        this.isLoading.set(false);
    }

    private async getOwnerInfo(ownerId: string){
        let ownerInfo = await this.usersService.getUserInfo(ownerId);
        return ownerInfo;
    }
}
