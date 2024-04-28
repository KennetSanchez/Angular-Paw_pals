import { Component, Input } from '@angular/core';
import { Pet } from '../../const/Pet';
import { Owner } from '../../const/Owner';

@Component({
    selector: 'app-pet-card',
    standalone: true,
    templateUrl: './pet-card.component.html',
    styleUrl: './pet-card.component.css',
    imports: []
})
export class PetCardComponent {
    @Input() petAndOwner: (Pet | Owner)[] = [];
    isDetail = true;
    owner : Owner | undefined;
    pet : Pet | undefined;

    ngOnInit(){
        this.pet = this.petAndOwner[0] as Pet;
        this.owner = this.petAndOwner[1] as Owner;
    }
}
