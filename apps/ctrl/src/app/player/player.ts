import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { VgAPI } from 'videogular2/core';

import { Signal, Status } from '@sgnl/signal';
import { IPlayable } from 'videogular2/src/core/vg-media/i-playable';
import {AuthService} from "@sgnl/auth";

@Component({
  selector: 'ctrl-player',
  template: `
    <h2 class="heading">CTRL_</h2>
    <h2 class="heading">status : {{ (status | async)?.state}}</h2>

    <h2 class="heading">Dispatches Commands</h2>

    <star-review
      [account]="'prism_account_001'"
      [installation]="'installation_id'">
    </star-review>
    <sig-player [video]="'assets/media/nike.mp4'" (playerReady)="getVideoApi($event)"></sig-player>
    <button class="set" (click)="setTime(60); sendStatusSignal()">set to 60</button>
    <button class="set2" (click)="setTime(80); sendStatusSignal()">set to 80</button>

    <button class="play" (click)="media?.state === 'paused' ? api.play() : api.pause() ">{{ media?.state === 'paused' ? 'play' : 'pause' }}</button>
  `,
  styles: [

    `
      .heading, .play, .set, .set2 {
        font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
        z-index: 1000;
        
      }
      .heading {
      position: relative;
      text-align: center;
      /*color: #FADD79;*/
      /*background-color: #242424;*/
      color: #74FAA2;
      font-weight: 100;
      
    }
    .play, .set, .set2 {
      position: absolute;
      right: 0;
      padding: 1rem;
      color: #242424;
      background: #FFFFFF;
      cursor: pointer;
      text-decoration: none;
      font-weight: light;
      border-radius: 5px;
      margin: 10px;
    }
    .play {
      top: 300px;
    }
    .set {
      top: 100px;
    }
    .set2 {
      top: 200px;
    }
    .play:hover, .set:hover {
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
    ::selection {
      color: #242424;
      background: #FFFFFF; /* WebKit/Blink Browsers */
    }
  `
  ]
})
export class PlayerComponent implements OnInit, OnChanges {
  api: VgAPI;
  account_id = 'prism_account_001';
  installation_id = 'installation_id';
  private statusDoc: AngularFirestoreDocument<Status>;

  statusRef = '/status/prism_account_001_installation_id';
  status: Observable<Status>;
  media: IPlayable;
  constructor(
    private cd: ChangeDetectorRef,
    private _hotkeysService: HotkeysService,
    private afs: AngularFirestore,
    private auth: AuthService,
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

  ngOnInit() {

    // this.account_id = this.auth.account_id;
    // console.log(this.account_id);
  }

  ngOnChanges() {
    console.log('changes!!!!!');
  }

  setTime(time) {
    this.api.seekTime(time);
  }

  playFromCtrl() {
    if (this.api.state === 'paused') {
      this.api.play();
    }
    this.api.pause();
  }

  async sendStatusSignal() {
    const status = {
      account_id: 'prism_account_001',
      installation_id: 'installation_id',
      state: this.api.state,
      currentTime: this.api.currentTime
    }
    console.log(status)
    await this.signal.setStatus(status);
  }
}
