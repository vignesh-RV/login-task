import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup} from '@angular/forms';
import { UtilService } from '../services/util.service';
import { FormService } from '../services/form.service';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loadingIcon: string;
    loginForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private util: UtilService,
        private formService: FormService) { }

    ngOnInit() {
        this.loadingIcon = this.util.loadingIcon;
        this.loginForm = this.formService.getLoginForm();
    }

    get loginFormControls() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        this.util.login(this.loginForm.getRawValue()).then((isPermitted: boolean) => {
            if (isPermitted) {
                this.router.navigate(['/home']);
            } else this.util.alert(2, "Invalid Credentials");
            this.loading = false;
        });
        this.loading = true;
    }
}
