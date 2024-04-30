import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { aReallyCoolAndActualHash, getFormValue } from '../../utils/tools';
import { User } from '../../const/User';
import { Credentials } from '../../const/Credentials';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output() formEmitter = new EventEmitter();

  formLogin: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.min(8), Validators.email, Validators.required]],
      password: ['', [Validators.min(8), Validators.required]],
    });
  }

  private parseToJson() {
    const preHashedPassword = getFormValue('password', this.formLogin);
    const json: Credentials = {
      email: getFormValue('email', this.formLogin),
      password: aReallyCoolAndActualHash(preHashedPassword),
    };
    return json;
  }

  cancel() {
    Object.values(this.formLogin.controls).forEach((control) => {
      control.setValue('');
      control.markAsUntouched();
    });
    this.formEmitter.emit(this.parseToJson());
    return;
  }

  submit() {
    if (this.formLogin.invalid) {
      Object.values(this.formLogin.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      this.formEmitter.emit(this.parseToJson());
    }
    return;
  }
}
