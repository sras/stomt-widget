import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { LocationService } from './location.service'
import { DropdownService } from './dropdown.service'

@Component({
  selector: 'stomt-input',
  template: `
  <div class="wrapper">
    <content-editable
      (contentChange)="contentChange($event)"
      >{{state=='wish'?'would':'because'}}</content-editable>
    <div class="placeholder" *ngIf="untouched">
      {{state=='like'?'because':'would'}}...just try to finish the sentence. Be on point. Only one {{state}} per stomt!
    </div>
  </div>
  <div class="drop-down-container"></div>
  `,
  styles: [`
    :host >>> .content-editable {
      height: 100px;
      width: 100%;
      position: absolute;
      color: black;
      z-index:11;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
    }
    :host >>> .content-editable:focus {
      outline: none;
    }
    .wrapper {
      color: gray;
      height: 100px;
      position: absolute;
      left: 0px;
      right: 0px;
      z-index:10;
      width: 100%;
    }
    .placeholder {
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 10px;
    }
  `]
})
export class StomtinputComponent {
  @Input()
  state: string

  untouched: boolean = true

  constructor(
      private dropdownService: DropdownService,
      private locationService: LocationService) {}

  contentChange(content: string) {
    if (content.substr(-1, 1) === '@') {
      let l = this.locationService.getCaretLocation()
      this.dropdownService.openAt(l.left, l.top + 20)
    }
    this.untouched = (content === 'would') || (content === 'because')
  }
}
