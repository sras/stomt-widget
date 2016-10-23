import { Component, Input, OnInit } from '@angular/core'
import { DropdownService } from './dropdown.service'

@Component({
  selector: 'dropdown',
  template: `
  <div 
    [ngStyle]="{'top.px': top, 'left.px': left}"
    class="drop-down-container" *ngIf="active">
  </div>
  `,
  styles: [
  `
    .drop-down-container {
      position: absolute;
      height: 200px;
      width: 200px;
      background-color: blue;
    }
  `
  ]
})

export class DropdownComponent implements OnInit {

  private active: boolean = false
  private left: number = 0
  private top: number = 0

  constructor(private dropdownService: DropdownService) {}

  ngOnInit() {
    this.dropdownService.openListener$.subscribe( (cords: {left: number, top: number}) => {
      this.active = true
      this.left = cords.left
      this.top = cords.top
    })
  }
}
