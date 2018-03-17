import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `    
    <h2 class="heading">RCVR_</h2>
    <h2 class="heading">Receives Commands</h2>
    <h4 [ngClass]="">status</h4>
    
    <sig-player [video]="'assets/media/sure.mp4'"></sig-player>
    <router-outlet></router-outlet>

  `,
  styles: [
    `
    .heading {
      position: relative;
      text-align: center;
      color: red;
      /*color: #74FAA2;*/
      /*background-color: #242424;*/
      /*font-family: Fira Mono;*/
      font-weight: 100;
      font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
      z-index: 1000;
    }
    ::selection {
      color: #242424;
      background: #FFFFFF; /* WebKit/Blink Browsers */
    }
  `
  ]
})
export class AppComponent implements OnInit {
  status;
  constructor() {}

  ngOnInit() {}
}
