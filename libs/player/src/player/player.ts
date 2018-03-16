import {Component, Input, OnInit} from '@angular/core';
import { VgAPI, VgStates } from 'videogular2/core';
import { IPlayable } from 'videogular2/src/core/vg-media/i-playable';
import { IFeed } from '@sgnl/player';

@Component({
  selector: 'sig-player',
  template: `
    <!--<vg-player>-->
      <!--<video [vgMedia]="media" #media id="sig-video" preload="auto" controls>-->
        <!--<source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">-->
      <!--</video>-->
    <!--</vg-player>-->
    

    <vg-player (onPlayerReady)="onPlayerReady($event)">
      <!--<div class="title" [ngClass]="{ 'hide': media?.state === 'playing' }">-->
        <!--Thanks to <a href="http://ign.com" target="_blank">IGN</a> for the video sources!-->
      <!--</div>-->

      <vg-overlay-play></vg-overlay-play>
      <vg-buffering></vg-buffering>

      <vg-scrub-bar>
        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
      </vg-scrub-bar>

      <!--<vg-controls>-->
        <!--<vg-play-pause></vg-play-pause>-->
        <!--<vg-playback-button></vg-playback-button>-->

        <!--&lt;!&ndash;<vg-scrub-bar>&ndash;&gt;-->
          <!--&lt;!&ndash;<vg-scrub-bar-current-time></vg-scrub-bar-current-time>&ndash;&gt;-->
        <!--&lt;!&ndash;</vg-scrub-bar>&ndash;&gt;-->

        <!--&lt;!&ndash;<div class="cam-selector-container">&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="cam-selected">feed</div>&ndash;&gt;-->

          <!--&lt;!&ndash;<select class="camera-selector" [(ngModel)]="selectedCamera.id" (change)="onSelectFeed($event.target.value, selectedCamera.id)">&ndash;&gt;-->
            <!--&lt;!&ndash;<option value="null">Select camera</option>&ndash;&gt;-->
            <!--&lt;!&ndash;<option&ndash;&gt;-->
              <!--&lt;!&ndash;*ngFor="let camera of feeds; let $$index = index;"&ndash;&gt;-->
              <!--&lt;!&ndash;[value]="$$index"&ndash;&gt;-->
              <!--&lt;!&ndash;[selected]="camera.selected === true">&ndash;&gt;-->
              <!--&lt;!&ndash;{{ camera.name }}&ndash;&gt;-->
            <!--&lt;!&ndash;</option>&ndash;&gt;-->
          <!--&lt;!&ndash;</select>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->

        <!--<vg-mute vgFor="master"></vg-mute>-->
        <!--<vg-volume vgFor="master"></vg-volume>-->

        <!--<vg-fullscreen></vg-fullscreen>-->
      <!--</vg-controls>-->

      <!--<sig-pip *ngIf="currentFeed.src"-->
              <!--(onCloseCam)="selectedCamera = { id: null }"-->
              <!--[camera]="selectedCamera">-->
      <!--</sig-pip>-->

      <video id="master"
             #masterRef
             [vgMedia]="masterRef"
             [vgMaster]="true"
             [src]=" video || currentFeed.src">
      </video>
    </vg-player>

    <ul>
      <li *ngFor="let feed of feeds; let $index = index"
          (click)="onSelectFeed(feed, $index)"
          [class.selected]="feed === currentFeed">
        {{ feed.name }}
      </li>
    </ul>
  `,
  styleUrls: ['player.scss']
})
export class PlayerComponent implements OnInit {
  @Input() video;

  currentFeed: IFeed;

  masterVideo = 'http://assets14.ign.com/videos/zencoder/2015/8/14/640/d9de372f3d373d06d4e770e73af44cb1-500000-1439510486-w.mp4';

  // selectedCamera: IFeed = { id: null } as IFeed;

  feeds: Array<IFeed> = [
    {
      id: 0,
      src:
        'http://assets14.ign.com/videos/zencoder/2015/8/14/640/d9de372f3d373d06d4e770e73af44cb1-500000-1439510486-w.mp4',
      name: 'main feed'
    },
    {
      id: 1,
      src:
        'http://assets14.ign.com/videos/zencoder/2015/7/31/640/8c76aa8849fb90f8dea93510dbb3a081-500000-1438352368-w.mp4',
      name: 'node_001'
    },
    {
      id: 2,
      src:
        'http://assets14.ign.com/videos/zencoder/2015/10/5/640/e510ec7503270e3d2fb8956f5457a583-500000-1444082732-w.mp4',
      name: 'node_002'
    },
    {
      id: 3,
      src:
        'http://assets14.ign.com/videos/zencoder/2016/10/19/640/7fbd4dff4a907e2bb94b92c3372d6e40-500000-1476921194-w.mp4',
      name: 'node_003'
    },
    {
      id: 4,
      src:
        'http://assets14.ign.com/videos/zencoder/2015/8/14/640/3494db07bf4565c213110558c22da978-500000-1439510425-w.mp4',
      name: 'node_004'
    }
  ];

  media: IPlayable;

  constructor() {}

  ngOnInit() {
    // this.currentFeed = this.feeds[0];
    this.currentFeed = null;

  }

  onPlayerReady(api: VgAPI) {
    this.media = api.getDefaultMedia();
  }

  onSelectFeed($event: any, index) {
    // $event.target.dispatchEvent(new CustomEvent('vgStartAnimation'));
    this.currentFeed = this.feeds[index];
    console.log('feed', this.currentFeed, index);
  }

  // onSelectCamera(index: number) {
  //   if (index >= 0) {
  //     this.selectedCamera = this.feeds[index];
  //   } else {
  //     this.selectedCamera = { id: null } as IFeed;
  //   }
  // }
}
