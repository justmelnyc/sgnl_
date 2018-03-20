import { Component, OnInit } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import {FirestoreService} from '@sgnl/fire'
import {AngularFireDatabase} from 'angularfire2/database'
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore'
import {Status} from '@sgnl/signal'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-root',
  template: `
    <h2 class="heading">RCVR_</h2>
    <h2 class="heading">status : {{  (status | async)?.state}}</h2>

    <h2 class="heading">Receives Commands</h2>
    
    <star-review
      [account]="'prism_account_001'"
      [installation]="'installation_id'">
    </star-review>

    <sig-player
      [video]="'https://firebasestorage.googleapis.com/v0/b/signal-dvlp.appspot.com/o/nike.mp4?alt=media&token=4577e160-2b2a-436f-88e3-bf83421fd0f5'"></sig-player>
    <router-outlet></router-outlet>

  `,
  styles: [
    `      
    .heading {
      position: relative;
      text-align: center;
      color: red;
      /*color: #74FAA2;*/
      /*background-color: #242424;*/
      /*font-family: Fira Mono;*/
      font-weight: 100;
      font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
      z-index: 1000;
    }
    ::selection {
      color: #242424;
      background: #FFFFFF; /* WebKit/Blink Browsers */
    }
  `
  ]
})
export class AppComponent implements OnInit {
  private statusDoc: AngularFirestoreDocument<Status>;

  statusRef = '/status/prism_account_001_installation_id'
  status :Observable<Status>;
  constructor(private _hotkeysService: HotkeysService, private afs: AngularFirestore) {
    this.statusDoc = afs.doc<Status>(this.statusRef)
    this.status = this.statusDoc.valueChanges()

    this._hotkeysService.add(
      new Hotkey('meta+shift+g', (event: KeyboardEvent): boolean => {
        console.log('Typed hotkey');
        return false; // Prevent bubbling
      })
    );
  }

  ngOnInit() {
    // this.status = this.fire.doc(this.statusRef)
    // console.getVideoApi('status',this.status)
  }
}
