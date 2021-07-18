import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    email = '';
    password = '';
    enableBtn = true;

    constructor(public router: Router, 
        public userService: UserService,
        public toastr: ToastrService,) { }

    ngOnInit() {}

    gotoLogin() {
        this.router.navigate(['/signin']);
    }

    register() {
        if(this.email == '' || this.password == '') {
            this.toastr.error("Vui lòng nhập vào email và password.");
        }
        else {
            this.enableBtn = false;
            this.userService.Register(this.email, this.password).then(res => {
                this.enableBtn = true;
                if(res.data.status) {
                    this.toastr.success("Đăng ký thành công vui lòng vào email để kích hoạt tài khoản.");
                    this.gotoLogin();
                }
                else {
                    this.toastr.error(res.data.message);
                }
            });
        }
    }
}
