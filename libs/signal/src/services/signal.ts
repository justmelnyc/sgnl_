import {Injectable, EventEmitter } from '@angular/core';

// import {IPlayable} from "../vg-media/i-playable";

import {SigStates} from "@sgnl/signal";
import {VgAPI} from "videogular2/core";

@Injectable()
export class Signal {

  isPlayerReady = false;
  medias:Object = {};
  playerReadyEvent: EventEmitter<any> = new EventEmitter(true);


  constructor(private vid: VgAPI) {

  }

  onPlayerReady() {
    this.isPlayerReady = true;
    this.playerReadyEvent.emit(this);
  }

  play() {
    for (const id in this.medias) {
      if (this.medias[id]) {
        this.medias[ id ].play();
      }
    }
  }


}
