import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { PlayerModule } from '@sgnl/player';
import {HotkeyModule, HotkeysService} from "angular2-hotkeys";

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    PlayerModule,
    HotkeyModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [HotkeysService],
  bootstrap: [AppComponent]
})
export class AppModule {}
