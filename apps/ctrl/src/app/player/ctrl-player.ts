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
    <sig-player [video]="'assets/media/l.mp4'" (playerReady)="getVideoApi($event)"></sig-player>
    <button class="set set4" (click)="setTime(0); sendStatusSignal()">reset</button>

    <!--<button class="set" (click)="setTime(40); sendStatusSignal()">set to 40</button>-->
    <button class="set" (click)="sendStatusSignal()">play</button>
    <button class="set2" (click)="setTime(60); sendStatusSignal()">set to 60</button>
    <button class="set3" (click)="setTime(80); sendStatusSignal()">set to 80</button>


    <button class="play" (click)="media?.state === 'paused' ? sendStatusSignal() : api.pause() ">{{ media?.state === 'paused' ? 'play' : 'pause' }}</button>
  `,
  styleUrls: ['ctrl-player.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
  api: VgAPI;
  account_id = 'prism_account_001';
  installation_id = 'installation_id';
  private statusDoc: AngularFirestoreDocument<Status>;

  statusRef = '/status/prism_account_001_installation_id';
  status: Observable<Status>;
  media: IPlayable;
  status$: Observable<Status>;

  constructor(
    private cd: ChangeDetectorRef,
    private _hotkeysService: HotkeysService,
    private afs: AngularFirestore,
    private auth: AuthService,
    private signal: Signal
  ) {
    this.statusDoc = afs.doc<Status>(this.statusRef);
    this.status = this.statusDoc.valueChanges();
    this.status$ = this.statusDoc.valueChanges()

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
    const change = this.status$.subscribe((status: Status) => {
      const time = status.currentTime;
      const state = status.state
      this.api.seekTime(time)

      if (state === 'playing') {
        setInterval( () => {

          if(new Date().getSeconds() === 30) {
            console.log('sync')
            this.api.play()
          }
        }, 10)

      }
    })
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
      state: 'playing',
      currentTime: this.api.currentTime
    }
    console.log(status)
    await this.signal.setStatus(status);
  }
}
