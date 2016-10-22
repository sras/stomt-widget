import { Component, Output, OnInit, EventEmitter } from '@angular/core'
@Component({
  selector: 'bubbles',
  template: `
  <div class="bubbles-container" (click)="switchStatus()">
    <div class="bubble wish" [ngClass]="{'foreground': bubbleStatus=='wish', 'background': bubbleStatus=='like'}">
      <img class="user-image" src="https://test.cdn.stomt.com/uploads/hH1c/s40x40/hH1cMKPIW1wF76139UktryDN0PC84tO6oIURFH7T_s40x40.png"/>
      <div class="text">I wish</div>
    </div>
    <div class="bubble like" [ngClass]="{'background': bubbleStatus=='wish', 'foreground': bubbleStatus=='like'}">
      <img class="user-image" src="https://test.cdn.stomt.com/uploads/hH1c/s40x40/hH1cMKPIW1wF76139UktryDN0PC84tO6oIURFH7T_s40x40.png"/>
      <div class="text">I like</div>
    </div>
  </div>
  `,
  styles: [`
    .bubbles-container {
      position: relative;
      width: 100px;
      height: 50px;
      cursor: pointer;
      display: inline-block;
    }
    .wish {
      background-color: #9013fe;
    }
    .like {
      background-color: #50e3c2;
    }
    .text {
      left: 40px;
      top: 0px;
      position: absolute;
    }
    .user-image {
      position: absolute;
      left: 2px;
      top: 2px;
      width: 30px;
    }
    .bubble {
      border-radius: 50px;
      display: inline-block;
      color: #fff;
      line-height: 34px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 34px;
      z-index: 1;
    }
    .foreground {
      top: 10px;
      left: 0px;
      z-index: 10;
    }

    .background {
      top: 0px;
      left: 10px;
      z-index: 0;
    }

    .bubbles-container:hover .foreground {
      transition: transform ease 200ms;
      transform: translate(-5px, 5px);
    }

    .bubbles-container:hover .background {
      transition: transform ease 200ms;
      transform: translate(5px, -5px);
    }
  `]
})
export class BubblesComponent implements OnInit {
  private bubbleStatus: string = null

  @Output()
  private stateChange: EventEmitter<{}> = new EventEmitter()

  ngOnInit() {
    this.setStatus('wish')
  }

  private setStatus(status) {
    this.bubbleStatus = status
    this.stateChange.emit(this.bubbleStatus)
  }

  switchStatus() {
    this.setStatus(this.bubbleStatus == 'wish'? 'like': 'wish')
  }
}
