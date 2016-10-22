import { Component, Input, OnInit } from '@angular/core'
import { ModalService } from './modal.service'

@Component({
  selector: 'modal',
  template: `
  <div *ngIf="active">
    <div class="mask" (click)="close()"></div>
    <div class="container">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  styles: [
  `
  .mask {
    position: fixed;
    left: 0px;
    top: 0px;
    opacity: 0.5;
    background-color: black;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .container {
    position: fixed;
    z-index: 11;
  }
  `
  ]
})

export class ModalComponent implements OnInit {

  private active: boolean = false

  @Input()
  public name;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.openListener$.subscribe(name => {
      if (name === this.name) {
        this.active = true
      }
    })

    this.modalService.closeListener$.subscribe(name => {
      if (name === this.name) {
        this.active = false
      }
    })
  }

  close() {
    this.modalService.close(this.name)
  }
}
