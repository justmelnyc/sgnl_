import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFeed } from '@sgnl/player';

@Component({
  selector: 'sig-pip',
  template: `
    <h1 class="twitter">{{ camera.twitter }}</h1>

    <video #pipRef
           [vgMedia]="pipRef"
           [src]="camera.src"
           id="slaveVideo"
           preload="auto"
           playsinline
           crossorigin
           [volume]="0"
           (click)="onClickCam()">
    </video>
  `,
  styles: [
    `
    /*sig-pip {*/
      /*z-index: 100000;*/
      /**/
    /*}*/
    
    vg-mute {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .twitter {
      width: calc(100% - 20px);
      padding: 10px;
      margin: 0;
      position: absolute;
      bottom: 0;
      color: #FFF;
      background-color: rgba(0, 0, 0, 0.8);
      font-size: 16px;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      text-align: right;
    }
  `
  ]
})
export class SigPipComponent {
  @Input() camera: IFeed;

  @Output() onCloseCam: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onClickCam() {
    this.onCloseCam.next();
  }
}
