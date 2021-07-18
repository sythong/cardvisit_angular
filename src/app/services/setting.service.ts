import { Injectable } from '@angular/core';
import { AuthHttp } from '../app.auth-http';

@Injectable()
export class SettingService {
  
  constructor(private http: AuthHttp) {
   }

  AddSetting(data): Promise<any> {
    return this.http.post(`setting/AddSetting`, JSON.stringify(data)).toPromise();
  }

  EditSetting(data): Promise<any> {
    return this.http.post(`setting/EditSetting`, JSON.stringify(data)).toPromise();
  }

  DeleteSetting(id, data): Promise<any> {
    return this.http.post(`setting/DeleteSetting/${id}`, JSON.stringify(data)).toPromise();
  }

  GetSettings(data): Promise<any> {
    return this.http.post(`setting/GetSettings`, JSON.stringify(data)).toPromise();
  }

  UpdateSortNumber(data): Promise<any> {
    return this.http.post(`setting/UpdateSortNumber`, JSON.stringify(data)).toPromise();
  }
}