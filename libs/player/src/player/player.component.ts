import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sig-player',
  template: `
    <vg-player>
      <video [vgMedia]="media" #media id="singleVideo" preload="auto" controls>
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
      </video>
    </vg-player>
  `,
  styles: [`
    vg-player {
      position: absolute;
      padding: 0;
      margin: 0;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
    }
    vg-player video {
      width: 100%;
    }
  `]
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
