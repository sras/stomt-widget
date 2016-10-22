import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { Target, Avatar } from './entities'
import { HttpService } from './http.service'

@Injectable()

export class SearchService {

  constructor(
    private http: HttpService
    ) {}

  searchTarget(slug: string): Observable<Target[]> {
    return this.http.get(this.getTargetSearchEndpoint(slug)).
      map(response => {
        console.log(response)
        return response.data.map(x => this.makeTarget(x))
      })
  }

  makeTarget(data): Target {
    let a = data['images']['avatar']
    let avatar = new Avatar(a['url'], a['w'], a['h'])
    return new Target(data['id'], data['displayname'], [avatar])
  }

  getTargetSearchEndpoint(slug: string): string {
    return `https://test.rest.stomt.com/search/targets?context=create_stomt&q=${slug}`
  }
}
