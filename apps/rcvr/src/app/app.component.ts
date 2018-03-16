import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `    
    <h2 class="heading">RCVR_</h2>
    <h2 class="heading">Receives Commands</h2>

    <sig-player></sig-player>
    <router-outlet></router-outlet>

  `,
  styles: [
    `
    .heading {
      position: relative;
      text-align: center;
      color: #E83248;
      /*color: #74FAA2;*/
      /*background-color: #242424;*/
      font-family: Fira Mono;
      z-index: 1000;
    }
  `
  ]
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
