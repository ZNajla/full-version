import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    // @ViewChild('f') forogtPasswordForm: NgForm;

    forgetPasswordFormSubmitted = false;

    public forgetPasswordForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
    });

    constructor(private router: Router,
        private route: ActivatedRoute , private formBuilder: FormBuilder) { }

    // On submit click, reset form fields
    onSubmit() {
        this.forgetPasswordFormSubmitted = true;
        if (this.forgetPasswordForm.invalid) {
            return;
        }
        console.log(this.forgetPasswordForm.value);
        // this.forgetPasswordForm.reset;
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
