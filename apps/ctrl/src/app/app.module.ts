import { NgModule, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { PlayerModule } from '@sgnl/player';
import { CommonUiModule } from '@sgnl/common-ui';
import { Signal } from '@sgnl/signal';
import { FirestoreService } from '@sgnl/fire';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule, FirebaseApp } from 'angularfire2';

import { environment } from '../environments/environment';
import { RoutingModule } from './app.routing';


import { HotkeyModule, HotkeysService } from 'angular2-hotkeys';
import {AuthModule, AuthService} from "@sgnl/auth";
import {PlayerComponent} from "./player/ctrl-player";
import {LoginComponent} from "./login/login";
import {AngularFireAuth} from "angularfire2/auth";

export function coreServices(): Provider[] {
  return [Signal, FirestoreService, AngularFireModule, AngularFireAuth, AngularFirestore, HotkeysService, AuthService];
}

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    CommonUiModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule,
    PlayerModule,
    AuthModule,
    RoutingModule,
    HotkeyModule.forRoot()
  ],
  declarations: [AppComponent, PlayerComponent, LoginComponent],
  providers: coreServices(),
  bootstrap: [AppComponent]
})
export class AppModule {}
