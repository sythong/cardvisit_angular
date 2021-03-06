import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SettingService } from 'app/services/setting.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './view-profile.html',
    styleUrls: ['./view-profile.scss']
})

export class ViewProfileComponent implements OnInit {
    id = 0;
    data = [];
    userInfo: any;
    tokenInfo: any;
    changeAvatar = true;
    public avatar : SafeUrl;
    public coverPhoto: SafeUrl;
    qrCodeValue : string;
    background : string;
    
    icons = [
        {id: 1,  mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Facebook.png', src: './assets/logo/facebook.png'},
        {id: 2,  mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Instagram.png', src: './assets/logo/instagram.png'},
        {id: 3,  mainColor: "black", type: "url", subColor: "black", banner: './assets/banner/Twith.png', src: './assets/logo/twith.png'},
        {id: 4,  mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Youtube.png', src: './assets/logo/youtube.png'},
        {id: 5,  mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Drive.png', src: './assets/logo/drive.png'},
        {id: 6,  mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Gmail.png', src: './assets/logo/gmail.png'},
        {id: 7,  mainColor: "black", type: "url", subColor: "black", banner: './assets/banner/Google.png', src: './assets/logo/google.png'},
        {id: 8,  mainColor: "black", type: "url", subColor: "black", banner: './assets/banner/Lazada.png', src: './assets/logo/lazada.png'},
        {id: 9,  mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Messenger.png', src: './assets/logo/messenger.png'},
        {id: 10, mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Pinterest.png', src: './assets/logo/pinterest.png'},
        {id: 11, mainColor: "black", type: "url", subColor: "black", banner: './assets/banner/Shopee.png', src: './assets/logo/shopee.png'},  
        {id: 12, mainColor: "black", type: "url", subColor: "black", banner: './assets/banner/Spotify.png', src: './assets/logo/spotify.png'},
        {id: 13, mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Tiki.png', src: './assets/logo/tiki.png'},
        {id: 14, mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Tiktok.png', src: './assets/logo/tiktok.png'},
        {id: 15, mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Zalo.png', src: './assets/logo/zalo.png'},
        {id: 32, mainColor: "white", type: "phone", subColor: "white", banner: './assets/banner/Phone.png', src: './assets/logo/phone.png'},
        {id: 16, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/ACB.png', src: './assets/logo/ACB.png'},
        {id: 17, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/Agribank.png', src: './assets/logo/Agribank.png'},
        {id: 18, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/BIDV.png', src: './assets/logo/BIDV.png'},
        {id: 19, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/DongA.png', src: './assets/logo/DongA.png'},
        {id: 20, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/MB.png', src: './assets/logo/MB.png'},
        {id: 21, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/Sacombank.png', src: './assets/logo/Sacombank.png'},
        {id: 22, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/HSBC.png', src: './assets/logo/hsbc.png'},
        {id: 23, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/Eximbank.png', src: './assets/logo/eximbank.png'},
        {id: 24, mainColor: "black", type: "bank", subColor: "black", banner: './assets/banner/HDbank.png', src: './assets/logo/hdbank.png'},
        {id: 25, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/MSB.png', src: './assets/logo/msb.png'},
        {id: 26, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/standard chartered.png', src: './assets/logo/standardchartered.png'},
        {id: 27, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/TPbank.png', src: './assets/logo/tpbank.png'},
        {id: 28, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/VPbank.png', src: './assets/logo/vietcombank.png'},
        {id: 29, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/Vietinbank.png', src: './assets/logo/vietinbank.png'},
        {id: 30, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/Vietcombank.png', src: './assets/logo/vpbank.png'},
        {id: 31, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/Techcombank.png', src: './assets/logo/techcombank.png'},
    ];
    
    backgrounds = [
        {id: 1,  mainColor: "white", subColor: "white", banner: './assets/background/N1.png', src: './assets/background/N1.1.png'},
        {id: 2,  mainColor: "white", subColor: "white", banner: './assets/background/N2.png', src: './assets/background/N2.1.png'},
        {id: 3,  mainColor: "white", subColor: "white", banner: './assets/background/N3.png', src: './assets/background/N3.1.png'},
        {id: 4,  mainColor: "white", subColor: "white", banner: './assets/background/N4.png', src: './assets/background/N4.1.png'},
        {id: 5,  mainColor: "black", subColor: "black", banner: './assets/background/N5.png', src: './assets/background/N5.1.png'},
        {id: 6,  mainColor: "black", subColor: "black", banner: './assets/background/N6.png', src: './assets/background/N6.1.png'},
        {id: 7,  mainColor: "black", subColor: "black", banner: './assets/background/N7.png', src: './assets/background/N7.1.png'},
        {id: 8,  mainColor: "white", subColor: "white", banner: './assets/background/N8.png', src: './assets/background/N8.1.png'},
        {id: 9,  mainColor: "white", subColor: "white", banner: './assets/background/N9.png', src: './assets/background/N9.1.png'},
        {id: 10, mainColor: "white", subColor: "white", banner: './assets/background/N10.png', src: './assets/background/N10.1.png'},
        {id: 11, mainColor: "white", subColor: "white", banner: './assets/background/N11.png', src: './assets/background/N11.1.png'},  
        {id: 12, mainColor: "white", subColor: "white", banner: './assets/background/N12.png', src: './assets/background/N12.1.png'},
        {id: 13, mainColor: "white", subColor: "white", banner: './assets/background/N13.png', src: './assets/background/N13.1.png'},
        {id: 14, mainColor: "white", subColor: "white", banner: './assets/background/N14.png', src: './assets/background/N14.1.png'},
        {id: 15, mainColor: "white", subColor: "white", banner: './assets/background/N15.png', src: './assets/background/N15.1.png'},
        {id: 16, mainColor: "white", subColor: "white", banner: './assets/background/N16.png', src: './assets/background/N16.1.png'},
        {id: 17, mainColor: "black", subColor: "black", banner: './assets/background/N17.png', src: './assets/background/N17.1.png'},
        {id: 18, mainColor: "white", subColor: "white", banner: './assets/background/N18.png', src: './assets/background/N18.1.png'},
        {id: 19, mainColor: "white", subColor: "white", banner: './assets/background/N19.png', src: './assets/background/N19.1.png'},
        {id: 20, mainColor: "white", subColor: "white", banner: './assets/background/N20.png', src: './assets/background/N20.1.png'},
        {id: 21, mainColor: "white", subColor: "white", banner: './assets/background/N21.png', src: './assets/background/N21.1.png'},  
        {id: 22, mainColor: "white", subColor: "white", banner: './assets/background/N22.png', src: './assets/background/N22.1.png'},
        {id: 23, mainColor: "black", subColor: "black", banner: './assets/background/N23.png', src: './assets/background/N23.1.png'},
        {id: 24, mainColor: "white", subColor: "white", banner: './assets/background/N24.png', src: './assets/background/N24.1.png'},
        {id: 25, mainColor: "white", subColor: "white", banner: './assets/background/N25.png', src: './assets/background/N25.1.png'},
        {id: 26, mainColor: "white", subColor: "white", banner: './assets/background/N26.png', src: './assets/background/N26.1.png'},
        {id: 27, mainColor: "white", subColor: "white", banner: './assets/background/N27.png', src: './assets/background/N27.1.png'},
        {id: 28, mainColor: "white", subColor: "white", banner: './assets/background/N28.png', src: './assets/background/N28.1.png'},
        {id: 29, mainColor: "white", subColor: "white", banner: './assets/background/N29.png', src: './assets/background/N29.1.png'},
        {id: 30, mainColor: "white", subColor: "white", banner: './assets/background/N30.png', src: './assets/background/N30.1.png'},
        {id: 31, mainColor: "white", subColor: "white", banner: './assets/background/N31.png', src: './assets/background/N31.1.png'},  
        {id: 32, mainColor: "white", subColor: "white", banner: './assets/background/N32.png', src: './assets/background/N32.1.png'},
        {id: 33, mainColor: "white", subColor: "white", banner: './assets/background/N33.png', src: './assets/background/N33.1.png'},
        {id: 34, mainColor: "white", subColor: "white", banner: './assets/background/N34.png', src: './assets/background/N34.1.png'},
        {id: 35, mainColor: "white", subColor: "white", banner: './assets/background/N35.png', src: './assets/background/N35.1.png'},
        {id: 36, mainColor: "white", subColor: "white", banner: './assets/background/N36.png', src: './assets/background/N36.1.png'},
        {id: 37, mainColor: "white", subColor: "white", banner: './assets/background/N37.png', src: './assets/background/N37.1.png'},
        {id: 38, mainColor: "white", subColor: "white", banner: './assets/background/N38.png', src: './assets/background/N38.1.png'},
        {id: 39, mainColor: "white", subColor: "white", banner: './assets/background/N39.png', src: './assets/background/N39.1.png'},
        {id: 40, mainColor: "white", subColor: "white", banner: './assets/background/N40.png', src: './assets/background/N40.1.png'},
    ];

    appBackgrounds = [
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
    private modalService: NgbModal,
    public _DomSanitizationService: DomSanitizer,
    public settingService: SettingService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrService) {
        this.activatedRoute.params.subscribe(params => {
            this.id = params.id;
        });
        this.userInfo = {};
        this.data = [];

        this.avatar = _DomSanitizationService.bypassSecurityTrustUrl('./assets/img/default-avatar.jpg');
        this.coverPhoto = _DomSanitizationService.bypassSecurityTrustUrl('./assets/img/no-image-available.jpg');
    }

    ngOnInit() {
        this.loadData();
    }

    copy(val) {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.toastr.success("copy to clipboard success");
    }

    loadData() {
        this.userService.GetUserProfile(this.id).then(res => {
            if(res.data.status) {
                this.userInfo = res.data.data.userInfo;
                this.qrCodeValue = environment.url + "/#/view-profile/" + this.userInfo.id;
                this.avatar = this._DomSanitizationService.bypassSecurityTrustUrl(this.userInfo.avatar != '' ? 'data:image/png;base64, ' + this.userInfo.avatar : './assets/img/default-avatar.jpg');
                this.coverPhoto = this._DomSanitizationService.bypassSecurityTrustUrl(this.userInfo.coverPhoto != '' ?'data:image/png;base64, ' + this.userInfo.coverPhoto : './assets/img/daniel-olahh.jpg');
                if(this.userInfo.backgroundId > 0) {
                    this.background = this.appBackgrounds.find(x => x.id == this.userInfo.backgroundId)?.banner ?? '';
                }

                this.data = res.data.data.settings;
                this.data.forEach(x => {
                    if(x.type == 1) {
                        var item = this.icons.find(c => c.id == x.backGround);

                        if(item) {
                            x.banner = item.banner;
                            x.actionType = item.type;
                            x.mainColor = item.mainColor;
                            x.subColor = item.subColor;
                        }
                    }
                    else {
                        var background = this.backgrounds.find(c => c.id == x.backGround);

                        if(background) {
                            x.banner = background.banner;
                            x.actionType = 'url';
                            x.mainColor = background.mainColor;
                            x.subColor = background.subColor;
                        }
                    }
                });
            }
            else {
                this.toastr.error(res.data.message);
            }
        });
    }

}
