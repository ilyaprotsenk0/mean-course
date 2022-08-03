import { AuthService } from './../auth.service';
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css']
})

export class SignUpComponent {
    constructor(public authService: AuthService) {

    }
    isLoading = false;

    onSignUp(form: NgForm) {
        if (form.invalid) {
            return; 
        }

        this.authService.createAuth(form.value.email, form.value.password);
    }
}