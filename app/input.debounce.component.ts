import { Component, Output, Input, EventEmitter, ElementRef } from '@angular/core'
import { Observable } from 'rxjs/Rx'

@Component({
  selector: 'debounced-input',
  template: `
  <input (keydown.arrowup)="keyupHandler()" (keydown.arrowdown)="keydownHandler()"   type="text" [(ngModel)]="inputValue"/>
  `
})
export class InputDebounceComponent {
  public inputValue: string

  @Input()
  public delay: number = 300

  @Output()
  private value: EventEmitter<{}> = new EventEmitter()

  @Output()
  private keyUpArrow: EventEmitter<{}> = new EventEmitter()

  @Output()
  private keyDownArrow: EventEmitter<{}> = new EventEmitter()

  constructor(private elementRef: ElementRef) {
    const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.inputValue)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => this.value.emit(input));
  }

  keyupHandler() {
    this.keyUpArrow.emit()
  }

  keydownHandler() {
    this.keyDownArrow.emit()
  }
}
