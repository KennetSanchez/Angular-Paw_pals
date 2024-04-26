import { Component, Input } from '@angular/core';
import { Pet } from '../../const/Pet';

@Component({
    selector: 'app-pet-card',
    standalone: true,
    templateUrl: './pet-card.component.html',
    styleUrl: './pet-card.component.css',
    imports: []
})
export class PetCardComponent {
    @Input() pet: Pet | null = null;
}
