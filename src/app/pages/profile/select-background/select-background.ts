import {Component, Input, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from 'app/services/setting.service';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'select-background-modal-content',
    styleUrls: ['./select-background.scss'],
    template: `
    <input id="selectIcon" type="file" class="filepicker" (change)="handleFileSelect($event)">
    <div class="modal-header" style="background-color: lightgray">
        <h5 class="modal-title text-center">Chọn background và màu chữ </h5>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body" style="background-color: lightgray; padding:10px; padding-right:30px">
        <div class="row">
            <div *ngFor="let icon of icons" style="width:60px; height:60px" class="col-2">
                <img [ngClass]="icon.id == id ? 'selected-icon' : 'select-icon'" class=" img-responsive " (click)="select(icon.id)" [src]="icon.src" >
            </div>
        </div>
    </div>
    <div class="modal-body"  style="background-color: lightgray; height:100%; padding:20px">
        <div > 
            <div class="row" style="padding:0px">
                <div class="col-lg-4 col-md-0" style="background-image: url('./assets/img/backgroundbanner.png');">
                </div>
                <div class="col-lg-4 col-md-12" style="background-image: url('./assets/img/backgroundbanner.png'); padding:0px">
                    <div class="page-header page-header-xs" data-parallax="true" style="min-height: 9vh !important; background-image: url('./assets/img/backgroundbanner.png');">
                    </div>
                </div>
                <div class="col-lg-4 col-md-0" style="background-image: url('./assets/img/backgroundbanner.png');">
                </div>
            </div>
            <div [style.background]="'url(' + selectedItem.banner + ') no-repeat center center fixed'" style="background-color:#18191a; padding-left:15px; padding-bottom: 120px;" class="bg-img section profile-content row">
            <div class="container">
                    <div class="owner">
                        <div class="avatar">
                            <img [src]="avatar" alt="Circle Image" class="img-circle img-no-padding img-responsive">
                        </div>
                        <div class="name">
                            <h4 class="title" style="color:white; font-size: 160%; margin: 0px;">{{userInfo.fullName}}<br /></h4>
                            <h6 style="font-size: 130%; color:white;" class="description">{{userInfo.job}}</h6>
                        </div>
                    </div>
                    <div class="row">
                        <!-- <div class="col-md-6 ml-auto mr-auto text-center">
                            <p>{{userInfo.note}}</p>
                            <br />
                        </div> -->
                    </div>
                    <br/>
                    <div class="row following" id="follows">
                        <div class="col-md-6 ml-auto mr-auto">
                            <ul class="list-unstyled follows">
                                <li>
                                    <div class="row">
                                        <img [src]="'./assets/banner/Facebook.png'" class="background img-responsive">
                                        <span class="sub-text" [style.color]="'white'">Khang HD</span>
                                        <span class="main-text" [style.color]="'white'">Dương Khang</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer" style="background-color: white">
        <div class="left-side">
            <button *ngIf="!isEdit" [disabled]="id == 0" type="button" class="btn btn-primary btn-link" (click)="add()">Sửa</button>
        </div>
        <div class="divider"></div>
        <div class="right-side">
            <button *ngIf="!isEdit" type="button" class="btn btn-danger btn-link" (click)="activeModal.close()">Cancel</button>
        </div>
    </div>
    `
})

export class SelectBackgroundContent implements OnInit {
    @Input() itemId: any;
    @Input() id: any;
    @Input() mainText: any;
    @Input() subText: any;
    @Input() url: any;
    @Input() isEdit: any;
    @Input() icon: any;
    selectedItem: any ;
    userInfo: any;
    tokenInfo: any;
    avatar: any;
    coverPhoto: any;
    
    textColor = [
        {id: 1, color:"black", src: './assets/text_color/black.png'},
        {id: 2, color:"white", src: './assets/text_color/white.png'},
    ];
    
    icons = [
        {id: 1,  mainColor: "white", subColor: "white", src: './assets/app_background/B1.png', banner: './assets/app_background/B1.1.png'},
        {id: 2,  mainColor: "white", subColor: "white", src: './assets/app_background/B2.png', banner: './assets/app_background/B2.1.png'},
        {id: 3,  mainColor: "white", subColor: "white", src: './assets/app_background/B3.png', banner: './assets/app_background/B3.1.png'},
        {id: 4,  mainColor: "white", subColor: "white", src: './assets/app_background/B4.png', banner: './assets/app_background/B4.1.png'},
        {id: 5,  mainColor: "black", subColor: "black", src: './assets/app_background/B5.png', banner: './assets/app_background/B5.1.png'},
        {id: 6,  mainColor: "black", subColor: "black", src: './assets/app_background/B6.png', banner: './assets/app_background/B6.1.png'},
        {id: 7,  mainColor: "black", subColor: "black", src: './assets/app_background/B7.png', banner: './assets/app_background/B7.1.png'},
        {id: 8,  mainColor: "white", subColor: "white", src: './assets/app_background/B8.png', banner: './assets/app_background/B8.1.png'},
        {id: 9,  mainColor: "white", subColor: "white", src: './assets/app_background/B9.png', banner: './assets/app_background/B9.1.png'},
        {id: 10, mainColor: "white", subColor: "white", src: './assets/app_background/B10.png', banner: './assets/app_background/B10.1.png'},
        {id: 11, mainColor: "white", subColor: "white", src: './assets/app_background/B11.png', banner: './assets/app_background/B11.1.png'},  
        {id: 12, mainColor: "white", subColor: "white", src: './assets/app_background/B12.png', banner: './assets/app_background/B12.1.png'},
        {id: 13, mainColor: "white", subColor: "white", src: './assets/app_background/B13.png', banner: './assets/app_background/B13.1.png'},
        {id: 14, mainColor: "white", subColor: "white", src: './assets/app_background/B14.png', banner: './assets/app_background/B14.1.png'},
        {id: 15, mainColor: "white", subColor: "white", src: './assets/app_background/B15.png', banner: './assets/app_background/B15.1.png'},
        {id: 16, mainColor: "white", subColor: "white", src: './assets/app_background/B16.png', banner: './assets/app_background/B16.1.png'},
        {id: 17, mainColor: "black", subColor: "black", src: './assets/app_background/B17.png', banner: './assets/app_background/B17.1.png'},
        {id: 18, mainColor: "white", subColor: "white", src: './assets/app_background/B18.png', banner: './assets/app_background/B18.1.png'},
        {id: 19, mainColor: "white", subColor: "white", src: './assets/app_background/B19.png', banner: './assets/app_background/B19.1.png'},
        {id: 20, mainColor: "white", subColor: "white", src: './assets/app_background/B20.png', banner: './assets/app_background/B20.1.png'},
        {id: 21, mainColor: "white", subColor: "white", src: './assets/app_background/B21.png', banner: './assets/app_background/B21.1.png'},  
        {id: 22, mainColor: "white", subColor: "white", src: './assets/app_background/B22.png', banner: './assets/app_background/B22.1.png'},
        {id: 23, mainColor: "black", subColor: "black", src: './assets/app_background/B23.png', banner: './assets/app_background/B23.1.png'},
        {id: 24, mainColor: "white", subColor: "white", src: './assets/app_background/B24.png', banner: './assets/app_background/B24.1.png'},
        {id: 25, mainColor: "white", subColor: "white", src: './assets/app_background/B25.png', banner: './assets/app_background/B25.1.png'},
        {id: 26, mainColor: "white", subColor: "white", src: './assets/app_background/B26.png', banner: './assets/app_background/B26.1.png'},
        {id: 27, mainColor: "white", subColor: "white", src: './assets/app_background/B27.png', banner: './assets/app_background/B27.1.png'},
    ];

    constructor(
        public activeModal: NgbActiveModal,
        public userService: UserService,
        public _DomSanitizationService: DomSanitizer,
        public toastr: ToastrService) {
        this.userInfo = JSON.parse(localStorage.getItem("user"));
        this.tokenInfo = JSON.parse(localStorage.getItem("token"));
        this.avatar = _DomSanitizationService.bypassSecurityTrustUrl(this.userInfo.avatar != '' ? 'data:image/png;base64, ' + this.userInfo.avatar : './assets/img/default-avatar.jpg');
        this.coverPhoto = _DomSanitizationService.bypassSecurityTrustUrl(this.userInfo.coverPhoto != '' ?'data:image/png;base64, ' + this.userInfo.coverPhoto : './assets/img/daniel-olahh.jpg');
    }

    changeIcon() {
        let element: HTMLElement = document.querySelector('#selectIcon') as HTMLElement;
        element.click();
    }
    
    ngOnInit() {
        this.selectedItem = this.icons.find(x => x.id == this.id);
    }

    select(id) {
        this.id = id;
        this.selectedItem = this.icons.find(x => x.id == this.id);
    }

    add() {
        var data = {
            userId: this.userInfo.id,
            type: 2,
            backGround: this.id,
            mainText: this.mainText,
            mainColor: this.selectedItem.mainColor,
            subText: this.subText,
            subColor: this.selectedItem.subColor,
            url: this.url,
            token: this.tokenInfo.token,
            iconBase64: this.icon
        }

        this.userService.ChangeBackground(this.id, data).then(res => {
            if(res.data.status) {
                this.toastr.success("Thay đổi background thành công");
                this.activeModal.close(data);
            }
            else {
                this.toastr.error(res.data.message);
            }
        });
    }

    handleFileSelect(evt) {
        var files = evt.target.files;
        var file = files[0];
      
        if (files && file) {
            var reader = new FileReader();
    
            reader.onload =this._handleReaderLoaded.bind(this);
    
            reader.readAsBinaryString(file);
        } 
    }
  
    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.icon =  btoa(binaryString);
    }
}
