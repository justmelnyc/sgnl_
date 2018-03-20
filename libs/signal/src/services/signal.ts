import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

// import {IPlayable} from "../vg-media/i-playable";

import { SigStates } from '@sgnl/signal';
import { VgAPI } from 'videogular2/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

export interface Status {
  account_id: any;
  installation_id: any;
  currentTime?: number
  state: string;
}

@Injectable()
export class Signal {
  isPlayerReady = false;
  medias: Object = {};
  playerReadyEvent: EventEmitter<any> = new EventEmitter(true);

  currentTime = new BehaviorSubject(0);

  private statusSource = new BehaviorSubject<Status>({account_id: 'prism_account_001',
  installation_id: 'installation_id', state: 'paused', currentTime: 0});

  status$ = this.statusSource.asObservable();

  constructor(private afs: AngularFirestore, private video: VgAPI) {}

  // status methods

  // Status that belong to an account
  getAccountStatus(account_id) {
    const statusRef = this.afs.collection('status', ref => ref.where('account_id', '==', account_id));
    return statusRef.valueChanges();
  }

  // Get all statuses that belongs to a Movie

  getInstallationStatus(installation_id) {
    const statusRef = this.afs.collection('status', ref => ref.where('installation_id', '==', 'installation_id'));
    console.log('statusRef : ' + statusRef.ref, 'installation_id : ' + installation_id);
    return statusRef.valueChanges();
  }

  // Create or update status
  setStatus(status) {
    // Status document data
    // const status: Status = { account_id, installation_id, state };

    // Custom doc ID for relationship

    this.statusSource.next(status);
    const statusPath = `status/${status.account_id}_${status.installation_id}`;

    // Set the data, return the promise
    return this.afs.doc(statusPath).set(status);
  }

  // old status method
  // setStatus(account_id, installation_id, state) {
  //   // Status document data
  //   const status: Status = { account_id, installation_id, state };
  //
  //   // Custom doc ID for relationship
  //   const statusPath = `status/${status.account_id}_${status.installation_id}`;
  //
  //   // Set the data, return the promise
  //   return this.afs.doc(statusPath).set(status);
  // }

  onPlayerReady() {
    this.isPlayerReady = true;
    this.playerReadyEvent.emit(this);
  }

  play() {
    for (const id in this.medias) {
      if (this.medias[id]) {
        this.medias[id].play();
      }
    }
  }
}
