import { Component } from '@angular/core';
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [UserFormComponent]
})
export class ProfileComponent {

}
