import { Component, Input, OnInit } from '@angular/core';
import { VgAPI, VgStates } from 'videogular2/core';
import { IPlayable } from 'videogular2/src/core/vg-media/i-playable';
import { IFeed } from '@sgnl/player';

@Component({
  selector: 'sig-player',
  template: `
    
    <vg-player class="player" (onPlayerReady)="onPlayerReady($event)">
      <vg-overlay-play></vg-overlay-play>
      <vg-buffering></vg-buffering>

      <vg-scrub-bar>
        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
      </vg-scrub-bar>

      <video id="master"
             #masterRef
             [vgMedia]="masterRef"
             [vgMaster]="true"
             [src]="video">
      </video>
    </vg-player>

    <ul>
      <li>{{ api.time | json }}</li>
      <li (click)="setTime(20)">set to 00:20</li>
      <li *ngIf="media?.state === 'paused'" (click)="api.play()">play</li>
      <li *ngIf="media?.state === 'playing'" (click)="api.pause()">pause</li>

      <li>{{ media?.currentTime }} / {{ media?.duration}}</li>
      <li>{{ media?.state }}</li>
    </ul>
  `,
  styleUrls: ['player.scss']
})
export class PlayerComponent implements OnInit {
  @Input() video;

  currentFeed: IFeed;
  api: VgAPI;
  duration = 0;
  current = 0;
  media: IPlayable;
  state: any;

  constructor() {}

  ngOnInit() {
    // this.currentFeed = this.feeds[0];
    this.currentFeed = null;
  }

  onPlayerReady(api: VgAPI) {
    console.log('player ready dawg');
    this.media = api.getDefaultMedia();

    this.api = api;

    setTimeout(() => {
      this.playAfter(api);
    }, 10000);


    console.log(this.media, this.api);
  }

  setTime(time) {
    this.api.seekTime(time);
  }

  // onSelectFeed($event: any, index) {
  //   // $event.target.dispatchEvent(new CustomEvent('vgStartAnimation'));
  //   this.currentFeed = this.feeds[index];
  //   console.log('feed', this.currentFeed, index);
  // }

  // onSelectCamera(index: number) {
  //   if (index >= 0) {
  //     this.selectedCamera = this.feeds[index];
  //   } else {
  //     this.selectedCamera = { id: null } as IFeed;
  //   }
  // }
  private playAfter(api) {
    api.play();
    api.seekTime(60);
    this.duration = api.duration;
    this.current = api.currentTime;
    this.state = api.state;
  }



}
