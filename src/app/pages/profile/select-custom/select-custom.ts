import {Component, Input, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from 'app/services/setting.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'select-custom-modal-content',
    styleUrls: ['./select-custom.scss'],
    template: `
    <input id="selectIcon" type="file" class="filepicker" (change)="handleFileSelect($event)">
    <div class="modal-header" style="background-color: lightgray">
        <h5 class="modal-title text-center">Chọn background để thêm vào hồ sơ</h5>
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
            <div class="col-2"> <label style="padding-top: 35%; color: black; font-weight: bold;">URL: </label></div>
            <div class="col-9" style="padding:0px"><input type="text" class="form-control" placeholder="https://example.com" [(ngModel)]="url" > </div>
        </div>
        <div  class="row">
            <img [src]="selectedItem?.banner" class="background img-responsive">
            <input type="text" class="form-control sub-text" placeholder="Place your text" [(ngModel)]="subText" [style.color]="selectedItem.subColor"> 
            <input type="text" class="form-control main-text" placeholder="Place your text" [(ngModel)]="mainText" [style.color]="selectedItem.mainColor"> 
            <img *ngIf="!icon || icon == ''" src="./assets/img/camera.jpg" class="img-circle img-no-padding img-responsive img-change-icon" (click)="changeIcon()">
            <img *ngIf="icon && icon != ''" [src]="_DomSanitizationService.bypassSecurityTrustUrl('data:image/png;base64, ' + icon)" class="img-circle img-no-padding img-responsive img-change-icon" (click)="changeIcon()">
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

export class SelectCustomContent implements OnInit {
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
    
    icons = [
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

    constructor(
        public activeModal: NgbActiveModal,
        public settingService: SettingService,
        public _DomSanitizationService: DomSanitizer,
        public toastr: ToastrService) {
        this.userInfo = JSON.parse(localStorage.getItem("user"));
        this.tokenInfo = JSON.parse(localStorage.getItem("token"));

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
