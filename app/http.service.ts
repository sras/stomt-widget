import { Injectable } from '@angular/core'
import { Observable }  from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
    ) {}

  private createAuthorizationHeader(headers: Headers) {
    headers.append('appid', 'stzmtmrEU3Kp42XJbX2eYUsYE')
  }

  get(url: string): Observable<any> {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {headers: headers}).
      map(response => {
        let json = response.json()
        if (json) {
          return json
        } else {
          return null
        }
      }).catch((error: any) => {
        return Observable.from([])
      })
  }
}
