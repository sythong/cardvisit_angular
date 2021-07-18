import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from 'app/services/setting.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'select-icon-modal-content',
    styleUrls: ['./select-icon.scss'],
    template: `
    <div class="modal-header" style="background-color: lightgray">
        <h5 class="modal-title text-center">Chọn logo để thêm vào hồ sơ</h5>
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
    <div class="modal-body" style="background-color: lightgray; height:225px; padding:20px">
        <div style="padding-bottom:20px" class="row">
            <div class="col-3"> 
                <label *ngIf="selectedItem?.type == 'bank'" style="padding-top: 10px; color: black; font-weight: bold;">Số TK: </label>
                <label *ngIf="selectedItem?.type == 'phone'" style="padding-top: 10px; color: black; font-weight: bold;">Số DT: </label>
                <label *ngIf="selectedItem?.type == 'url'" style="padding-top: 10px; color: black; font-weight: bold;">URL: </label>
            </div>
            <div class="col-8" style="padding:0px"><input type="text" class="form-control" placeholder="https://example.com" [(ngModel)]="url" > </div>
        </div>
        <div  class="row">
            <img [src]="selectedItem?.banner" class="background img-responsive">
            <input type="text" class="form-control sub-text" placeholder="Place your text" [(ngModel)]="subText" [style.color]="selectedItem.subColor"> 
            <input type="text" class="form-control main-text" placeholder="Place your text" [(ngModel)]="mainText" [style.color]="selectedItem.mainColor"> 
        </div>
    </div>
    <div class="modal-footer" style="background-color: white">
        <div class="left-side">
            <button *ngIf="!isEdit" [disabled]="id == 0" type="button" class="btn btn-primary btn-link" (click)="add()">Thêm</button>
            <button *ngIf="isEdit" [disabled]="id == 0" type="button" class="btn btn-primary btn-link" (click)="edit()">sửa</button>
        </div>
        <div class="divider"></div>
        <div class="right-side">
            <button *ngIf="!isEdit" type="button" class="btn btn-danger btn-link" (click)="activeModal.close()">Cancel</button>
            <button *ngIf="isEdit" type="button" class="btn btn-danger btn-link" (click)="delete()">Xóa</button>
        </div>
    </div>
    `   
})

export class SelectIconContent implements OnInit {
    @Input() itemId: any;
    @Input() id: any;
    @Input() mainText: any;
    @Input() subText: any;
    @Input() url: any;
    @Input() isEdit: any;
    selectedItem: any ;
    userInfo: any;
    tokenInfo: any;
    
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
        {id: 34, mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/momo.png', src: './assets/logo/momo.png'},
        {id: 35, mainColor: "white", type: "url", subColor: "white", banner: './assets/banner/Viber.png', src: './assets/logo/viber.png'},
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
        {id: 33, mainColor: "white", type: "bank", subColor: "white", banner: './assets/banner/Contact.png', src: './assets/logo/contact.png'},
    ];
    
    constructor(
        public activeModal: NgbActiveModal,
        public settingService: SettingService,
        public toastr: ToastrService) {
        this.userInfo = JSON.parse(localStorage.getItem("user"));
        this.tokenInfo = JSON.parse(localStorage.getItem("token"));
    }

    getUrlLabel() {
    //    return this.;
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
            type: 1,
            backGround: this.id,
            mainText: this.mainText,
            mainColor: this.selectedItem.mainColor,
            subText: this.subText,
            subColor: this.selectedItem.subColor,
            url: this.url,
            token: this.tokenInfo.token
        }

        this.settingService.AddSetting(data).then(res => {
            if(res.data.status) {
                this.toastr.success("Thêm banner thành công");
                this.activeModal.close(data);
            }
            else {
                this.toastr.error(res.data.message);
            }
        });
    }

    edit() {
        var data = {
            id: this.itemId,
            userId: this.userInfo.id,
            type: 1,
            backGround: this.id,
            mainText: this.mainText,
            mainColor: this.selectedItem.mainColor,
            subText: this.subText,
            subColor: this.selectedItem.subColor,
            url: this.url,
            token: this.tokenInfo.token
        }
        
        this.settingService.EditSetting(data).then(res => {
            if(res.data.status) {
                this.toastr.success("Chỉnh sửa banner thành công");
                this.activeModal.close(true);
            }
            else {
                this.toastr.error(res.data.message);
            }
        });
    }

    delete() {
        var data = {
            userId: this.userInfo.id,
            token: this.tokenInfo.token
        }
        
        this.settingService.DeleteSetting(this.itemId, data).then(res => {
            if(res.data.status) {
                this.toastr.success("Xóa banner thành công");
                this.activeModal.close(true);
            }
            else {
                this.toastr.error(res.data.message);
            }
        });
        
    }
}
