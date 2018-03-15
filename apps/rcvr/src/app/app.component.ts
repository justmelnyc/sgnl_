import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `    
    <h2 class="heading">RCVR_</h2>

    <sig-player></sig-player>
    <router-outlet></router-outlet>

  `,
  styles: [`
    .heading {
      position: relative;
      text-align: center;
      background-color: #74FAA2;
      color: #242424;
      font-family: Fira Mono;
      z-index: 1000;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }
}
