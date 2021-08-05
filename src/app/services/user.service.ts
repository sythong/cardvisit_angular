import { Injectable } from '@angular/core';
import { AuthHttp } from '../app.auth-http';

@Injectable()
export class UserService {
  constructor(private http: AuthHttp) { }

  login(email, password): Promise<any> {
    return this.http.get(`user/login/${email}/${password}`).toPromise();
  }

  ChangeAvatar(data): Promise<any> {
    return this.http.post(`user/ChangeAvatar`, JSON.stringify(data)).toPromise();
  }

  ChangeCoverPhoto(data): Promise<any> {
    return this.http.post(`user/ChangeCoverPhoto`, JSON.stringify(data)).toPromise();
  }

  Register(email, link, password): Promise<any> {
    return this.http.get(`user/Register/${email}/${link}/${password}`).toPromise();
  }

  UpdateUserInfo(data): Promise<any> {
    return this.http.post(`user/UpdateUserInfo`, JSON.stringify(data)).toPromise();
  }

  GetUserProfile(userId): Promise<any> {
    return this.http.get(`user/GetUserProfile/${userId}`).toPromise();
  }

  Logout(data): Promise<any> {
    return this.http.post(`user/Logout`, JSON.stringify(data)).toPromise();
  }

  ChangeBackground(id, data): Promise<any> {
    return this.http.post(`user/ChangeBackground/${id}`, JSON.stringify(data)).toPromise();
  }
}