import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../const/User';
import { setFormValue } from '../../utils/tools';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
    
  @Output() formEmitter = new EventEmitter();
  @Input() previousData : any = {};  
  
  formUser : FormGroup;

    constructor( private fb : FormBuilder){
      this.formUser = this.fb.group({
        email: ['', [Validators.min(8), Validators.email, Validators.required]],
        password: ['', [Validators.min(8), Validators.required]]
      })
    }

    ngOnChanges(){
      let data : User = this.previousData;
      setFormValue('email', data.email, this.formUser);
    }


}
