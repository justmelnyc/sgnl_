import { Component, OnInit, ChangeDetectorRef, OnChanges  } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import {FirestoreService} from '@sgnl/fire'
import {AngularFireDatabase} from 'angularfire2/database'
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore'
import {Signal, Status} from '@sgnl/signal'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-root',
  template: `    
    <h2 class="heading">CTRL_</h2>
    <h2 class="heading">status : {{  (status | async)?.state}}</h2>

    <h2 class="heading">Dispatches Commands</h2>

    <star-review
      [account]="'prism_account_001'"
      [installation]="'installation_id'">
    </star-review>
    
    <sig-player [video]="'assets/media/nike.mp4'"></sig-player>
    
    <router-outlet></router-outlet>
  `,
  styles: [
    `
    .heading {
      position: relative;
      text-align: center;
      /*color: #FADD79;*/
      /*background-color: #242424;*/
      color: #74FAA2;
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
export class AppComponent implements OnInit, OnChanges {
  private statusDoc: AngularFirestoreDocument<Status>;

  statusRef = '/status/prism_account_001_installation_id'
  status :Observable<Status>;
  constructor(private cd: ChangeDetectorRef, private _hotkeysService: HotkeysService, private afs: AngularFirestore, private signal: Signal) {
    this.statusDoc = afs.doc<Status>(this.statusRef)
    this.status = this.statusDoc.valueChanges()

    this._hotkeysService.add(
      new Hotkey('meta+shift+f', (event: KeyboardEvent): boolean => {
        console.log('Typed hotkey');
        // this.signal.setStatus('account_id', 'installation_id', 20)
        return false; // Prevent bubbling
      })
    );
  }

  ngOnInit() {
    // this.status = this.fire.doc(this.statusRef)
    // console.log('status',this.status)
  }

  ngOnChanges() {
    console.log('changes!!!!!');

  }
}
