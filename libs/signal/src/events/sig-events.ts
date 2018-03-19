import { Injectable } from '@angular/core';

@Injectable()
export class SigEvents {
  static SIG_ABORT = 'abort';
  static SIG_CAN_PLAY = 'canplay';
  static SIG_CAN_PLAY_THROUGH = 'canplaythrough';
  static SIG_DURATION_CHANGE = 'durationchange';
  static SIG_EMPTIED = 'emptied';
  static SIG_ENCRYPTED = 'encrypted';
  static SIG_ENDED = 'ended';
  static SIG_ERROR = 'error';
  static SIG_LOADED_DATA = 'loadeddata';
  static SIG_LOADED_METADATA = 'loadedmetadata';
  static SIG_LOAD_START = 'loadstart';
  static SIG_PAUSE = 'pause';
  static SIG_PLAY = 'play';
  static SIG_PLAYING = 'playing';
  static SIG_PROGRESS = 'progress';
  static SIG_RATE_CHANGE = 'ratechange';
  static SIG_SEEK = 'seek';
  static SIG_SEEKED = 'seeked';
  static SIG_SEEKING = 'seeking';
  static SIG_STALLED = 'stalled';
  static SIG_SUSPEND = 'suspend';
  static SIG_TIME_UPDATE = 'timeupdate';
  static SIG_VOLUME_CHANGE = 'volumechange';
  static SIG_WAITING = 'waiting';

  static SIG_LOAD = 'load';
  static SIG_ENTER = 'enter';
  static SIG_EXIT = 'exit';

  static SIG_START_ADS = 'startads';
  static SIG_END_ADS = 'endads';
}
