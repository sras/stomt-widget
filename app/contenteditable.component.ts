import { Component, ViewChild, Input, Output, OnChanges, SimpleChanges, ElementRef, EventEmitter } from '@angular/core'
@Component({
  selector: 'content-editable',
  template: `
  <div #contentEditableElement
    (input)="inputHandler()"
    class="content-editable"
    contenteditable="true"><ng-content></ng-content></div>
  `,
  styles: [`
  `]
})
export class ContentEditableComponent implements OnChanges {
  @Output()
  contentChange: EventEmitter<string> = new EventEmitter<string>()

  contentEditableElement

  @ViewChild('contentEditableElement')
  set _contentEditableElement(eRef: ElementRef) {
    if (eRef) {
      this.contentEditableElement = eRef.nativeElement
    } else {
      console.log("element undefined")
    }
  }

  inputHandler() {
    this.contentChange.emit(this.contentEditableElement.innerText)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('state')) {

    }
  }
}
