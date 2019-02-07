import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class FormService {

    constructor( private formBuilder: FormBuilder) {
    }

    getLoginForm(): FormGroup{
       return this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    getRegisterationForm(): FormGroup{
        return this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: [''],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
            confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
            phonenumber: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.maxLength(20)]],
            email: ['', [Validators.required, Validators.email]],
            address: ['', [Validators.maxLength(30)]]
        }, { validator: this.checkPasswordMatch });
    }

    checkPasswordMatch(abstractControl: AbstractControl) {
        let password = abstractControl.get('password');
        let confirmPassword = abstractControl.get('confirmpassword');
         if(password && confirmPassword && confirmPassword.dirty && password.value != confirmPassword.value) {
             abstractControl.get('confirmpassword').setErrors( {MatchPassword: true} )
         } else {
             return null
         }
     }
}