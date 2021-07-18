import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.html',
    styleUrls: ['./signin.scss']
})
export class SigninComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    email = '';
    password = '';
    constructor(
        public router: Router,
        public userService: UserService,
        public toastr: ToastrService,
         ) { }

    ngOnInit() {}

    login() {
        this.userService.login(this.email, this.password).then(res => {
            if(res.data.status) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.setItem('token', JSON.stringify(res.data.data.tokenInfo));
                localStorage.setItem('user', JSON.stringify(res.data.data.userInfo));
                this.router.navigate(['/user-profile']);
            }
            else {
                this.toastr.error(res.data.message);
            }
        });
    }

    goToSignup() {

    }
}
