import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pet } from '../../const/Pet';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { getFormValue, setFormValue } from '../../utils/tools';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css',
  imports: [ReactiveFormsModule, PetCardComponent],
})
export class PetFormComponent {

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

  ngOnChanges() {
    let data: Pet = this.previousData;
    setFormValue('name', data.name, this.formPet);
    setFormValue('description', data.description, this.formPet);
    setFormValue('breed', data.breed, this.formPet);
    setFormValue('age', data.age + '', this.formPet);
    setFormValue('weight', data.weight + '', this.formPet);
    setFormValue('height', data.height + '', this.formPet);
    setFormValue('location', data.location, this.formPet);
  }

  private parseToJson(): Pet {
    return {
      ownerId: '',
      petId: '',
      name: getFormValue('name', this.formPet),
      description: getFormValue('description', this.formPet),
      breed: getFormValue('breed', this.formPet),
      weight: Number.parseFloat(getFormValue('weight', this.formPet)),
      height: Number.parseFloat(getFormValue('height', this.formPet)),
      age: Number.parseFloat(getFormValue('age', this.formPet)),
      location: getFormValue('location', this.formPet),
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
    if (this.formPet.invalid) {
      Object.values(this.formPet.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      this.formEmitter.emit(this.parseToJson());
    }
    return;
  }
}
