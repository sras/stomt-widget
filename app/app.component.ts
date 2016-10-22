import { Component } from '@angular/core';
import { Target } from './entities';

@Component({
  selector: 'stomt-widget',
  template: `
  <div class="stomt-create-form">
    <bubbles (stateChange)="setBubbleStatus($event)"></bubbles>
    <target-selector (targetSelected)="setCurrentTarget($event)"></target-selector>
    <br/>
    <stomt-input
      (contentChange)="contentChange($event)"
      [state]="bubbleStatus"></stomt-input>
  </div>
  `,
  styles: [`
  .stomt-create-form {
    max-width: 420px;
    height: 190px;
    position: relative;
    padding: 10px;
    padding-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 53px;
    border: solid 2px #aab8c2;
    border-radius: 8px;
    background-color: #fff;
    font-size: 18px;
    text-align: left;
    padding-top: 20px;
  }
  `]
})
export class AppComponent {
  bubbleStatus: string = null
  target: Target = null

  private setBubbleStatus(status) {
    this.bubbleStatus = status
  }

  private setCurrentTarget(target) {
    this.target = target
  }

  contentChange(content) {
    console.log(content)
  }
}
