import { Injectable } from '@angular/core'
import { Subject }    from 'rxjs/Subject';

@Injectable()

export class DropdownService {

  private openSubject: Subject<{}> = new Subject<{}>()
  private closeSubject: Subject<void> = new Subject<void>()

  openListener$ = this.openSubject.asObservable()
  closeListener$ = this.closeSubject.asObservable()

  openAt(left: number, top: number) {
    this.openSubject.next({top: top, left: left})
  }

  close(name: string) {
    this.closeSubject.next()
  }
}
