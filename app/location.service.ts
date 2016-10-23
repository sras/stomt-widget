import { Injectable } from '@angular/core'
import { WindowRef } from './window.ref'
import { DocumentRef } from './document.ref'

@Injectable()
export class LocationService {

  constructor(
    private windowRef: WindowRef,
    private documentRef: DocumentRef
    ) {
    console.log(this.windowRef.nativeWindow)
    console.log(this.documentRef.documentRef)
  }

  private range() {
    var sel;
    if (!this.windowRef.nativeWindow.getSelection) {
      return;
    }
    sel = this.windowRef.nativeWindow.getSelection();
    if (sel.rangeCount > 0) {
      return sel.getRangeAt(0);
    } else {
      return null;
    }
  }

  getCaretLocation(): {left: number, top: number} {
    var clonedRange, offset, range, rect, shadowCaret;
    if (this.windowRef.nativeWindow.getSelection && (range = this.range())) {
      if (range.endOffset - 1 > 0) {
        clonedRange = range.cloneRange();
        clonedRange.setStart(range.endContainer, range.endOffset - 1);
        clonedRange.setEnd(range.endContainer, range.endOffset);
        rect = clonedRange.getBoundingClientRect();
        offset = {
          height: rect.height,
          left: rect.left + rect.width,
          top: rect.top
        };
        clonedRange.detach();
      }
      if (!offset || (offset != null ? offset.height : void 0) === 0) {
        clonedRange = range.cloneRange();
        shadowCaret = this.documentRef.documentRef.createTextNode("|");
        clonedRange.insertNode(shadowCaret);
        clonedRange.selectNode(shadowCaret);
        rect = clonedRange.getBoundingClientRect();
        offset = {
          height: rect.height,
          left: rect.left,
          top: rect.top
        };
        shadowCaret.remove();
        clonedRange.detach();
      }
    } 
//    else if (this.documentRef.selection) {
//       offset = this.getOldIEOffset();
//    }
    return offset;
  }
}
