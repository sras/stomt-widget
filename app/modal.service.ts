import { Injectable } from '@angular/core'
import { Subject }    from 'rxjs/Subject';

@Injectable()

export class ModalService {

  private openSubject: Subject<string> = new Subject<string>()
  private closeSubject: Subject<string> = new Subject<string>()

  openListener$ = this.openSubject.asObservable()
  closeListener$ = this.closeSubject.asObservable()

  open(name: string) {
    this.openSubject.next(name)
  }

  close(name: string) {
    this.closeSubject.next(name)
  }

}
