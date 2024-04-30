import { Component, EventEmitter, Input, input, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../const/User';
import { aReallyCoolAndActualHash, getFormValue, setFormValue } from '../../utils/tools';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Output() formEmitter = new EventEmitter();
  @Input() previousData: any = {};

  @Input() isRegister : any = {};
  @Input() primaryButtonText : string = '';
  @Input() secondaryButtonText : string = '';

  formUser: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formUser = this.fb.group({
      name: ['', [Validators.min(4), Validators.required]],
      phoneNumber: ['', [Validators.min(8), Validators.required]],
      email: ['', [Validators.min(8), Validators.email, Validators.required]],
      password: ['', [Validators.min(8), Validators.required]],
    });
  }

  private parseToJson(){
    const preHashedPassword = getFormValue('password', this.formUser);
    const json : User = {
      isFirstTime: this.isRegister,
      id: '',
      name: getFormValue('name', this.formUser),
      hashedPassword: aReallyCoolAndActualHash(preHashedPassword),
      phoneNumber: getFormValue('phoneNumber', this.formUser),
      email: getFormValue('email', this.formUser),
      petsIds: []
    }

    return json;
  }

  ngOnChanges() {
    let data: User = this.previousData;
    setFormValue('name', data.name, this.formUser);
    setFormValue('email', data.email, this.formUser);
    setFormValue('password', data.hashedPassword, this.formUser)
    setFormValue('phoneNumber', data.phoneNumber, this.formUser);
  }

  
  cancel() {
    Object.values(this.formUser.controls).forEach((control) => {
      control.setValue('');
      control.markAsUntouched();
    });
    this.formEmitter.emit();
    return;
  }

  submit() {
    if (this.formUser.invalid) {
      Object.values(this.formUser.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      this.formEmitter.emit(this.parseToJson());
    }
    return;
  }
}
