import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getPatrons(id): Observable<Location[]> {
    return this.http.post(`/api/user/users`, {id})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  logInCheck(): Observable<any[]> {
    return this.http.get('/api/login/auth/check')
              .map(this.check)
              .catch(this.handleError)
  }

  private check(res: Response) {
    let loggedIn = res.json();
    return loggedIn.loggedin || false;
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.businesses || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
