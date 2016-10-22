import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule } from '@angular/forms';
import { BubblesComponent }   from './bubbles.component';
import { StomtinputComponent }   from './stomtinput.component';
import { ContentEditableComponent }   from './contenteditable.component';
import { ModalComponent }   from './modal.component';
import { ModalService }   from './modal.service';
import { SearchService }   from './search.service';
import { TargetSelectorComponent }   from './target.selector.component';
import { TargetSearchComponent }   from './target.search.component';
import { InputDebounceComponent }   from './input.debounce.component';
import { HttpModule }    from '@angular/http';
import { HttpService }    from './http.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule],
  declarations: [ AppComponent, ContentEditableComponent, StomtinputComponent, ModalComponent, BubblesComponent, TargetSelectorComponent, TargetSearchComponent, InputDebounceComponent ],
  providers: [ModalService, SearchService, HttpService],
  entryComponents: [TargetSearchComponent],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
