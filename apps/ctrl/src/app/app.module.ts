import {NgModule, Provider} from '@angular/core'
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { PlayerModule } from '@sgnl/player';
import {CommonUiModule} from "@sgnl/common-ui";
import {Signal} from '@sgnl/signal'
import {FirestoreService} from '@sgnl/fire'
import {AngularFirestore} from 'angularfire2/firestore'
import {AngularFireModule, FirebaseApp} from 'angularfire2'
import { environment } from '../environments/environment';

import { HotkeyModule, HotkeysService } from 'angular2-hotkeys';


export function coreServices(): Provider[] {
  return [Signal, FirestoreService, AngularFireModule, AngularFirestore, HotkeysService];
}

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    CommonUiModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    PlayerModule,
    HotkeyModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: coreServices(),
  bootstrap: [AppComponent]
})
export class AppModule {}
