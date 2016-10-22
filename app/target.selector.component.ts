import { Component, EventEmitter, Output } from '@angular/core'
import { TargetSearchComponent } from './target.search.component'
import { ModalService } from './modal.service'
import { Target } from './entities'

@Component({
  selector: 'target-selector',
  template: `
  <div *ngIf="!target" class="target-selection-container" (click)="activate(true)">
    <img class="thoughtful-img" src="https://cdn.jsdelivr.net/emojione/assets/png/1f914.png?v=1.2.4"/>
    <span >Who?</span>
    <span class="more"></span>
  </div>
  <div *ngIf="target" class="target-selection-container target-selected" (click)="activate(true)">
    <img class="target-bubble-image" src="{{target.avatars[0].url}}"/>
    <span class="target-bubble-text">{{target.displayname}}</span>
    <span class="more"></span>
  </div>
  <modal [name]="'target-search'">
    <target-search (targetSelect)="targetSelect($event)"></target-search>
  </modal>
  `,
  styles: [`
  .target-bubble-text {
    padding-left: 38px;
  }
  .more {
    font-family: icon;
    height: 34px;
    width: 34px;
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(90deg);
    line-height: 34px;
    text-align: center;
    font-size: 16px;
    padding-left: 3px;
  }
  .more:before {
    content: "";
  }
  .target-selection-container.target-selected {
    background-color: #e1e8ed;
    padding-right: 40px;
  }
  .target-selection-container {
    display: inline-block;
    background-color: #ffc70e;
    border-radius: 34px;
    line-height: 34px;
    max-width: 100%;
    height: 34px;
    min-width: 115px;
    position: relative;
    top: -15px;
    margin-left: 10px;
  }
  .thoughtful-img {
    width: 34px;
    height: 34px;
    vertical-align: middle;
  }
  .target-bubble-image {
    height: 34px;
    width: 34px;
    border-radius: 34px;
    position: absolute;
    top: 0;
    left: 0;
  }
  `]
})
export class TargetSelectorComponent {
  public active: boolean = false
  public target: Target = null

  @Output()
  public targetSelected = new EventEmitter<Target>()

  constructor(private modalService: ModalService) {}

  activate(b: boolean) {
    this.modalService.open('target-search')
  }

  targetSelect(target: Target) {
    this.target = target
    this.targetSelected.emit(target)
  }
}
