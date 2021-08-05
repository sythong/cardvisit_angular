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
    passwordConfirm = '';
    link = '';
    enableBtn = true;

    constructor(public router: Router, 
        public userService: UserService,
        public toastr: ToastrService,) { }

    ngOnInit() {}

    gotoLogin() {
        this.router.navigate(['/signin']);
    }

    checkLink(e){
        var nameRegex = /^[a-zA-Z0-9._]$/;
        if(!nameRegex.exec(e.key)) {
            this.link = this.link.substring(0, this.link.length - 1);
        }
    }

    register() {
        if(this.email == '' || this.password == '') {
            this.toastr.error("Vui lòng nhập vào email và password.");
        }
        else if (this.password.length< 8) {
            this.toastr.error("Mật khẩu phải lớn hơn hoặc bằng 8 ký tự.");
        }
        else if (this.password != this.passwordConfirm) {
            this.toastr.error("Xác nhận mật khẩu không đúng.");
        }
        else if(this.link.length < 4 || this.link.length > 20) {
            this.toastr.error("Link phải từ 4 - 20 ký tự");
        }
        else {
            this.enableBtn = false;
            this.userService.Register(this.email, this.link, this.password).then(res => {
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
