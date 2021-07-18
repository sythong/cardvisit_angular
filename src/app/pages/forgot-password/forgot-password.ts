import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './forgot-password.html',
    styleUrls: ['./forgot-password.scss']
})
export class ForgotPasswordComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    constructor(public router: Router) { }

    ngOnInit() {}

    gotoLogin() {
        this.router.navigate(['/signin']);
    }
}
