import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private util: UtilService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
            phonenumber: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    registerUser() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.util.registerUser(this.registerForm.getRawValue()).then((isSaved: boolean) => {
            if (isSaved) {
                this.util.alert(1, "User Registered Successfully..");
                this.router.navigate(['/login']);
            }else this.util.alert(2, "Please try again");
        });
        this.loading = true;
         
    }
}
