import { Injectable, EventEmitter } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'

// import {IPlayable} from "../vg-media/i-playable";

import { SigStates } from '@sgnl/signal'
import { VgAPI } from 'videogular2/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
// import {INode} from '../../../../apps/rcvr/src/app/player/rcvr-player'

export interface Status {
  account_id: any;
  installation_id: any;
  currentTime?: number
  state: string;
}

@Injectable()
export class Signal {
  isPlayerReady = false
  medias: Object = {}
  playerReadyEvent: EventEmitter<any> = new EventEmitter(true)

  currentTime = new BehaviorSubject(0)


  initialStatus = {
    account_id: 'prism_account_001',
    installation_id: 'installation_id',
    state: 'paused',
    currentTime: 0
  }

  private statusSource = new BehaviorSubject<Status>(this.initialStatus)

  public status$: Observable<Status> = this.statusSource.asObservable()

  constructor(private afs: AngularFirestore, private video: VgAPI) {}

  // status methods

  // Status that belong to an account


  getItem(key: string, defaultValue?: any): any {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return defaultValue;
    }
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getConfigId() {
    const localStorageConfig = JSON.parse(localStorage.getItem('config'));
    console.log('where here now in the getConfigID', localStorageConfig)
    return localStorageConfig == null ? '1' : localStorageConfig.id
  }

  setConfigId(id) {
    localStorage.setItem('config', JSON.stringify(id));

  }


  getAccountStatus(account_id) {
    const statusRef = this.afs.collection('status', ref => ref.where('account_id', '==', account_id))
    return statusRef.valueChanges()
  }

  // Get all statuses that belongs to a Movie

  getInstallationStatus(installation_id) {
    const statusRef = this.afs.collection('status', ref => ref.where('installation_id', '==', 'installation_id'))
    console.log('statusRef : ' + statusRef.ref, 'installation_id : ' + installation_id)
    return statusRef.valueChanges()
  }

  // setNodeIndex(id) {
  //   const node = { id: id };
  //   this.localStorage.setItem('node', node).subscribe(() => {});
  // }
  //
  // getNodeIndex() {
  //   const id = null;
  //
  //   this.localStorage.getItem('node').subscribe((node) => {
  //     return node.id;
  //   });
  //
  // }



  // Create or update status
  setStatus(status) {
    // Status document data
    // const status: Status = { account_id, installation_id, state };

    // Custom doc ID for relationship

    this.statusSource.next(status)
    const statusPath = `status/${status.account_id}_${status.installation_id}`

    // Set the data, return the promise
    return this.afs.doc(statusPath).set(status)
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
    this.isPlayerReady = true
    this.playerReadyEvent.emit(this)
  }

  play() {
    for (const id in this.medias) {
      if (this.medias[id]) {
        this.medias[id].play()
      }
    }
  }
}
