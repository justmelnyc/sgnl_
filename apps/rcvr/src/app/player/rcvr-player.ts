import {Component, OnChanges, OnInit} from '@angular/core'
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { FirestoreService } from '@sgnl/fire';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {SigEvents, Signal, Status} from '@sgnl/signal'
import { Observable } from 'rxjs/Observable';
import {VgAPI} from 'videogular2/core'

@Component({
  selector: 'rcvr-player',
  template: `
    <h2 class="heading">RCVR_</h2>
    <h2 class="heading">status : {{  (status$ | async)?.state}}</h2>

    <h2 class="heading">Receives Commands {{ status$ | async | json }}</h2>

    <button class="set" (click)="setTime()">set to 80</button>
    
    <star-review
      [account]="'prism_account_001'"
      [installation]="'installation_id'">
    </star-review>

    <sig-player
      (playerReady)="getVideoApi($event)"
      [video]="'assets/media/sure.mp4'"></sig-player>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['rcvr-player.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
  private statusDoc: AngularFirestoreDocument<Status>;
  state;
  api: VgAPI;
  media;

  statusRef = '/status/prism_account_001_installation_id';
  status$: Observable<Status>;
  constructor(private signal: Signal, private _hotkeysService: HotkeysService, private afs: AngularFirestore) {
    this.statusDoc = afs.doc<Status>(this.statusRef);
    this.status$ = this.statusDoc.valueChanges()
    console.log('the status',this.status$)

    this._hotkeysService.add(
      new Hotkey('meta+shift+g', (event: KeyboardEvent): boolean => {
        console.log('Typed hotkey');
        return false; // Prevent bubbling
      })
    );
    this.state = this.signal.status$
      .subscribe(status => {
        if(this.api) {
          this.setTime(status.currentTime)

        }
      });
  }

  ngOnChanges() {
    this.status$.subscribe(status => {
      if (this.api) {
        this.api.currentTime(status);
      }
      console.log('status: ', status)
    })
  }

  ngOnInit() {
    // this.status$

    // this.status = this.fire.doc(this.statusRef)
    // console.getVideoApi('status',this.status)

    const change = this.status$.subscribe((status: Status) => {
      const time = status.currentTime;
      this.api.seekTime(time);
    })
  }

  getVideoApi(api: VgAPI) {
    this.api = api;
    //api.currentTime(this.status.state)
    this.media = api.getDefaultMedia();
  }

  setTime(time) {
    // const status = this.state;
    this.api.seekTime(time)

    // console.log(status.currentTime)

  }
}
