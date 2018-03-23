import {Component, OnChanges, OnInit} from '@angular/core'
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { FirestoreService } from '@sgnl/fire';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {SigEvents, Signal, Status} from '@sgnl/signal'
import { Observable } from 'rxjs/Observable';
import {VgAPI} from 'videogular2/core'
import {AuthService} from '@sgnl/auth'

@Component({
  selector: 'app-root',
  template: `
    <button class="logout" (click)="signOut()">logout</button>
    <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent implements OnInit, OnChanges {
  private statusDoc: AngularFirestoreDocument<Status>;
  state;
  api: VgAPI;
  media;

  // firebase video url: https://firebasestorage.googleapis.com/v0/b/signal-dvlp.appspot.com/o/nike.mp4?alt=media&token=4577e160-2b2a-436f-88e3-bf83421fd0f5

  statusRef = '/status/prism_account_001_installation_id';
  status$: Observable<Status>;
  constructor(private signal: Signal, private _hotkeysService: HotkeysService, private afs: AngularFirestore, private auth: AuthService) {
    this.statusDoc = afs.doc<Status>(this.statusRef);
    this.status$ = this.statusDoc.valueChanges();

    // this._hotkeysService.add(
    //   new Hotkey('meta+shift+g', (event: KeyboardEvent): boolean => {
    //     console.log('Typed hotkey');
    //     return false; // Prevent bubbling
    //   })
    // );
    // this.state = this.signal.status$
    //   .subscribe(status => {
    //     if(this.api) {
    //       this.setTime(status.currentTime)
    //     }
    //   });
  }

  ngOnChanges() {
    // this.status$.subscribe(status => {
    //   if (this.api) {
    //     this.api.currentTime(status);
    //   }
    //   console.log('status: ', status)
    // })
  }

  ngOnInit() {

    // this.status$

    // this.status = this.fire.doc(this.statusRef)
    // console.getVideoApi('status',this.status)

    // const change = this.status$.subscribe((status: Status) => {
    //   const time = status.currentTime;
    //     this.api.seekTime(time);
    // })
  }

  signOut() {
    this.auth.signOut();
  }

  getVideoApi(api: VgAPI) {

    // this.api = api;
    // //api.currentTime(this.status.state)
    // this.media = api.getDefaultMedia();
  }

  // setTime(time) {
  //   // const status = this.state;
  //   this.api.seekTime(time)
  //
  //   // console.log(status.currentTime)
  //
  // }
}
