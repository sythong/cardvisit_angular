import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthHttp {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _toastr: ToastrService,
    private _router: Router) { }

  get(url) {
    return this.request("GET", url);
  }

  post(url, body?) {
    return this.request("POST", url, body);
  }

  put(url, body?) {
    return this.request("PUT", url, body);
  }

  delete(url, body?) {
    return this.request("DELETE", url, body);
  }

  requestSpecial(method, url, body, headers) {
    let requestOptions = {
      body: body,
      headers: headers,
      reportProgress: true
    };

    return Observable.create(observer => {
      this.http.request(method, url, requestOptions).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      }, (err) => {
        this._toastr.error(err.status, err.statusText);
        observer.error(err);
      });
    });
  }

  private request(method, url, body?) {
    const requestOptions = {
      body: body,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Key'
      }),
      reportProgress: true
    };

    return Observable.create(observer => {
      this.http.request(method, environment.apiURL + url, requestOptions).subscribe((res: any) => {
        if (res.data.status == false) {
          if(res.data.sessionTimeout) {
            this.router.navigate(["/signin"]);
          }
        }
        observer.next(res);
        observer.complete();
      }, (err) => {
        switch (err.status) {
          case 0:
            this._toastr.error('500', 'Internal Server Error');
            break;
          case 401:
            this.refreshToken(method, url, body, observer, err);
            break;
          default:
            this._toastr.error(err.status, err.statusText);
            observer.error(err);
            break;
        }
      });
    });
  }

  private refreshToken(method, url, body, observer, err) {
    this.post('refreshToken', JSON.stringify({ Token: localStorage.getItem('RefreshToken') })).toPromise().then(response => {
      if (response.status) {
        localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
        if (response.autoRefreshToken) localStorage.setItem('RefreshToken', response.data.refreshToken);

        // request again;
        this.request(method, url, body).toPromise().then(response => {
          observer.next(response);
          observer.complete();
        });
      }
      else {
        observer.error(err);

        // clear local storage related authorize
        localStorage.removeItem("Authorization");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("User");
        localStorage.removeItem("Role");
        
        this._router.navigate(['login'], { queryParams: { returnUrl: location.href } });
      }
    });
  }
}
