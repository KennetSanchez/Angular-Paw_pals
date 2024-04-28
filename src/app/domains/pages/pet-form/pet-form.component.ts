import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pet } from '../../const/Pet';
import { PetCardComponent } from '../pet-card/pet-card.component';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css',
  imports: [ReactiveFormsModule, PetCardComponent],
})
export class PetFormComponent {
  userId = '';
  petId = '';

  @Output() formEmitter = new EventEmitter();
  @Input() previousData: any = {};

  formPet: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formPet = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      description: [this.previousData.description || '', Validators.required],
      breed: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(10)]],
      location: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    let data: Pet = this.previousData;
    console.log(data);
    this.setValue('name', data.name);
    this.setValue('description', data.description);
    this.setValue('breed', data.breed);
    this.setValue('age', data.age + '');
    this.setValue('weight', data.weight + '');
    this.setValue('height', data.height + '');
    this.setValue('location', data.location);
  }

  private getValue(inputName: string) {
    return this.formPet.get(inputName)?.value;
  }

  private setValue(inputName: string, value: string) {
    this.formPet.get(inputName)?.setValue(value);
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

  cancel() {
    Object.values(this.formPet.controls).forEach((control) => {
      control.setValue('');
      control.markAsUntouched();
    });
    this.formEmitter.emit();
    return;
  }

  submit() {
    console.log('Submit');

    if (this.formPet.invalid) {
      console.log('Información errónea');
      Object.values(this.formPet.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      console.log('Enviando ... ');
      this.formEmitter.emit(this.parseToJson());
    }
    return;
  }
}
