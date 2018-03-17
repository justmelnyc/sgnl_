import {Injectable} from '@angular/core';

@Injectable()
export class SigStates {
  static SIG_ENDED = 'ended';
  static SIG_PAUSED = 'paused';
  static SIG_PLAYING = 'playing';
  static SIG_LOADING = 'waiting';
}
