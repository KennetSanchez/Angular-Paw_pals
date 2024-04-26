import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../const/Pet';
import { PetCardComponent } from "../pet-card/pet-card.component";
@Component({
    selector: 'app-pet-addition',
    standalone: true,
    templateUrl: './pet-addition.component.html',
    styleUrl: './pet-addition.component.css',
    imports: [ReactiveFormsModule, PetCardComponent]
})
export class PetAdditionComponent {

  userId = '';
  petId = '';
  
  @Output() formEmitter = new EventEmitter();

  formPet: FormGroup;
  constructor(private fb:FormBuilder){
    this.formPet = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(8)]],
      description : ['', Validators.required],
      breed : ['', [Validators.required, Validators.minLength(3)]],
      age : ['', [Validators.required, Validators.min(1)]],
      weight : ['', [Validators.required, Validators.min(1)]],
      height : ['', [Validators.required, Validators.min(10)]],
      location : ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  private getValue(inputName: string){
    return this.formPet.get(inputName)?.value;
  }

  private parseToJson(): Pet {
    return {
      ownerId: this.userId,
      petId: this.petId,
      name: this.getValue('name'),
      description: this.getValue('description'),
      breed: this.getValue('breed'),
      weight: Number.parseFloat(this.getValue('weight')),
      height: Number.parseFloat(this.getValue('height')),
      age: Number.parseFloat(this.getValue('age')),
      location: this.getValue('location'),
    };
  }

  cancel(){

  }

  submit() {
    console.log("Submit");

    if(this.formPet.invalid){
      console.log('Información errónea');
      Object.values(this.formPet.controls).forEach( control => {
        control.markAllAsTouched();
      })
    }else{
    console.log("Enviando ... ");
      this.formEmitter.emit(this.parseToJson());
    }
    return;
  }
}
