import { Component, Input, OnInit, ChangeDetectorRef, OnChanges, Output, EventEmitter } from '@angular/core';

import { VgAPI, VgStates } from 'videogular2/core';
import { IPlayable } from 'videogular2/src/core/vg-media/i-playable';
import { IFeed } from '@sgnl/player';

@Component({
  selector: 'sig-player',
  template: `
    
    <vg-player class="player" (onPlayerReady)="onPlayerReady($event)">
      <vg-overlay-play></vg-overlay-play>
      <vg-buffering></vg-buffering>
      <!--<sig-buffer></sig-buffer>-->


      <vg-scrub-bar >
        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
      </vg-scrub-bar>

      <!--<vg-controls [vgAutohide]="true"-->
                   <!--[vgAutohideTime]="3">-->
        <!--<vg-scrub-bar>-->
          <!--<vg-scrub-bar-current-time></vg-scrub-bar-current-time>-->
        <!--</vg-scrub-bar>-->
        <!---->
      <!--</vg-controls>-->

      <video id="master"
             #masterRef
             [vgMedia]="masterRef"
             [vgMaster]="true"
             [src]="video">
      </video>
    </vg-player>




    <code>
      <ul>
        <li>{{ api.time.current | timecode: 'mm:ss' }} — {{ api.time.left | timecode: 'mm:ss' }} — {{ api.time.total | timecode: 'mm:ss' }}</li>
        <li (click)="setTime(20)">set to 00:20</li>
        <!--<li *ngIf="media?.state === 'paused'" (click)="api.play()">play</li>-->
        <!--<li *ngIf="media?.state === 'playing'" (click)="api.pause()">pause</li>-->

        <!--<li (click)="media?.state === 'paused' ? api.play() : api.pause() ">{{ media?.state === 'paused' ? 'play' : 'pause' }}</li>-->


        <li>{{ media?.currentTime }} / {{ media?.duration}}</li>
        <li>{{ media?.state }}</li>
      </ul>
    </code>

  `,
  styleUrls: ['player.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
  sources: Array<any>;

  @Input() video;

  @Input() autoPlay: boolean = false;

  @Input()
  set playResource(_resource: string) {
    this.changeResource(_resource, 'video/mp4');
  }

  @Output() playerReady = new EventEmitter();

  currentFeed: IFeed;
  api: VgAPI = null;
  duration = 0;
  current = 0;
  media: IPlayable;
  state: any;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    // this.currentFeed = this.feeds[0];
    this.currentFeed = null;
  }

  ngOnChanges() {
    console.log('changes!!!!!');
    if (this.api !== null) this.media = this.api.getDefaultMedia();
    this.cd.detectChanges();
  }

  onPlayerReady(api: VgAPI) {
    console.log('player ready!!!');

    this.media = api.getDefaultMedia();

    this.api = api;

    this.setTime(60);

    this.playerReady.emit(api);

    // setTimeout(() => {
    //   this.playAfter(api);
    // }, 10000);
    //

    // console.log(this.media, this.api);
  }

  setTime(time) {
    this.api.seekTime(time);
  }

  // onSelectFeed($event: any, index) {
  //   // $event.target.dispatchEvent(new CustomEvent('vgStartAnimation'));
  //   this.currentFeed = this.feeds[index];
  //   console.getVideoApi('feed', this.currentFeed, index);
  // }

  // onSelectCamera(index: number) {
  //   if (index >= 0) {
  //     this.selectedCamera = this.feeds[index];
  //   } else {
  //     this.selectedCamera = { id: null } as IFeed;
  //   }
  // }
  // private playAfter(api) {
  //   api.play();
  //   api.seekTime(60);
  //   this.duration = api.duration;
  //   this.current = api.currentTime;
  //   this.state = api.state;
  // }

  changeResource(source: string, type: string) {
    if (this.api) this.api.pause();
    this.sources = new Array<Object>();
    this.sources.push({
      src: source,
      type: type
    });
    setTimeout(() => {
      this.api.getDefaultMedia().currentTime = 0;
      if (this.api && this.autoPlay) this.api.play();
    }, 300);
  }

  getApi(): VgAPI {
    return this.api;
  }
}
