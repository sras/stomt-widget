import { Component, Output, EventEmitter } from '@angular/core'
import { ModalService } from './modal.service'
import { Observable } from 'rxjs/Rx'
import { Target } from './entities'
import { SearchService } from './search.service'

@Component({
  selector: 'target-search',
  template: `
  <div class="target-search-container">
    <div class="header">
      <div class="header-text">Address your wish to</div>
        <div class="input-container">
          <debounced-input (keyUpArrow)="keyupHandler()" (keyDownArrow)="keydownHandler()" (value)="refresh($event)"></debounced-input>
        </div>
    </div>
    <div *ngFor="let target of targets.slice(this.topOffset);"
      (click)="makeFinalSelection(target)"
      (mouseover)="setSelected(target)"
      class="search-result-wrapper"
      [ngClass]="{'active': target && target.id == selectedId}"
      >
      <div class="search-result">
        <img alt="Picture of stomt iOS" src="{{target.avatars[0].url}}"/>
        <div class="name-container">
          <div class="display-name ng-binding">{{target.displayname}}</div>
          <div class="src-id ng-binding">@{{target.id}}</div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
  `
  .search-result {
    height: 50px;
  }
  .active {
    background-color: #4faaf1;
  }
  .search-result-wrapper {
  }
  .search-result img {
    width: 40px;
    height: 40px;
    border: solid 3px transparent;
    border-radius: 50%;
    float: left;
    margin-left: 18px;
    margin-right: 17px;
    margin-top: 3px;
    clear: both;
  }
  .name-container {
    position: relative;
    float: left;
    border-bottom: solid 1px #e1e8ed;
    height: 50px;
    width: 200px;
  }
  :host >>> input {
    width: 100%;
    border-radius: 88px;
    height: 40px;
    padding-top: 11px;
    padding-bottom: 11px;
    padding-left: 14px;
    background-color: #fff;
    border: solid 1px #aab8c2;
  }
  .input-container {
    margin: 18px;
    margin-top: 0;
  }
  .header-text {
    margin-left: 32px;
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 11px;
  }
  .header {
    width: 100%;
    display: inline-block;
    background-color: #f8fafb;
  }
  .target-search-container {
    margin: auto;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    border-radius: 6px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    height: 379px;
    width: 364px;
  }
  `
  ]
})

export class TargetSearchComponent {

  private targets: Target[] = []
  private topOffset: number = null
  private selectedId: string = null

  @Output()
  targetSelect: EventEmitter<Target> = new EventEmitter<Target>()

  constructor(
      private searchService: SearchService,
      private modalService: ModalService
      ) {}

  refresh(val) {
    this.searchService.searchTarget(val).subscribe(targets => {
      this.targets = targets
      this.topOffset = 0
    })
  }

  keyupHandler() {
    this.topOffset -= 1
    if (this.topOffset < 0) {
      this.topOffset = this.targets.length - 1
    }
    this.selectedId = this.targets[this.topOffset].id
  }

  keydownHandler() {
    this.topOffset += 1
    if (!(this.topOffset < this.targets.length)) {
      this.topOffset = 0
    }
    this.selectedId = this.targets[this.topOffset].id
  }

  setSelected(target: Target) {
    this.selectedId = target.id;
  }

  makeFinalSelection(target: Target) {
    this.targetSelect.emit(target)
    this.modalService.close('target-search')
  }
}
