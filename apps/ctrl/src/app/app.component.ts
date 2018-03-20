import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { VgAPI } from 'videogular2/core';

import { Signal, Status } from '@sgnl/signal';
import { IPlayable } from 'videogular2/src/core/vg-media/i-playable';
import {AuthService} from "@sgnl/auth";

@Component({
  selector: 'app-root',
  template: `    
    <button class="logout" (click)="signOut()">logout</button>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .logout {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1rem;
        color: #242424;
        background: #FFFFFF;
        cursor: pointer;
        z-index: 100000;
        text-decoration: none;
        font-weight: light;
        border-radius: 5px;
        margin: 10px;
        font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
      }
      .logout:hover {
        background-color: #74FAA2;
        color: #FFFFFF;
        border: none;
      }
      button, input[type="submit"], input[type="reset"] {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  api: VgAPI;
  private statusDoc: AngularFirestoreDocument<Status>;

  statusRef = '/status/prism_account_001_installation_id';
  status: Observable<Status>;
  media: IPlayable;
  constructor(
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private _hotkeysService: HotkeysService,
    private afs: AngularFirestore,
    private signal: Signal
  ) {
    this.statusDoc = afs.doc<Status>(this.statusRef);
    this.status = this.statusDoc.valueChanges();

    this._hotkeysService.add(
      new Hotkey('meta+shift+f', (event: KeyboardEvent): boolean => {
        console.log('Typed hotkey');
        // this.signal.setStatus('account_id', 'installation_id', 20)
        return false; // Prevent bubbling
      })
    );
  }

  getVideoApi(api: VgAPI) {
    // console.log('ready CTRL_ :', api)
    // setTimeout(() => {
    //   api.play();
    // }, 10000);

    this.api = api;
    this.media = api.getDefaultMedia();
  }

  ngOnInit() {}

  signOut() {
    this.auth.signOut();
  }

  playFromCtrl() {
    if (this.api.state === 'paused') {
      this.api.play();
    }
    this.api.pause();
  }
}
