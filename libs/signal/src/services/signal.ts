import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

// import {IPlayable} from "../vg-media/i-playable";

import { SigStates } from '@sgnl/signal';
import { VgAPI } from 'videogular2/core';

export interface Status {
  account_id: any;
  installation_id: any;
  state: number;
}

@Injectable()
export class Signal {
  isPlayerReady = false;
  medias: Object = {};
  playerReadyEvent: EventEmitter<any> = new EventEmitter(true);

  constructor(private afs: AngularFirestore, private vid: VgAPI) {}



  // status methods

  // Status reviews that belong to a user
  getAccountStatus(account_id) {
    const starsRef = this.afs.collection('status', ref => ref.where('account_id', '==', account_id) );
    return starsRef.valueChanges();
  }

  // Get all stars that belongs to a Movie

  getInstallationStatus(installation_id) {
    const starsRef = this.afs.collection('status', ref => ref.where('installation_id', '==', 'installation_id') );
    console.log('starsRef : '+ starsRef.ref, 'installation_id : ' + installation_id)
    return starsRef.valueChanges();
  }

  // Create or update star
  setStatus(account_id, installation_id, state) {
    // Status document data
    const star: Status = { account_id, installation_id, state };

    // Custom doc ID for relationship
    const starPath = `status/${star.account_id}_${star.installation_id}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }

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
