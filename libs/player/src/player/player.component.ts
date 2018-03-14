import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'player',
  template: `
    <vg-player>
      <video [vgMedia]="media" #media id="singleVideo" preload="auto" controls>
        <source src="http://static.videogular.com/assets/videos/videogular.mp4" type="video/mp4">
      </video>
    </vg-player>
  `,
  styles: []
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
