import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    loadingIcon: string;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formservice: FormService,
        private router: Router,
        private util: UtilService) { }

    ngOnInit() {
        this.loadingIcon = this.util.loadingIcon;
        this.registerForm = this.formservice.getRegisterationForm();
    }

    get form() { return this.registerForm.controls; }

    registerUser() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        this.util.registerUser(this.registerForm.getRawValue()).then((isSaved: boolean) => {
            if (isSaved) {
                this.util.alert(1, "User Registered Successfully..");
                this.router.navigate(['/login']);
            }else this.util.alert(2, "Username already taken");
        });
        this.loading = true;
         
    }
}
