import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `    
    <div style="text-align:center; background-color: #74FAA2; color: #22424; font-family: Fira Mono">
      <h1>
        Welcome to an Angular CLI app built with Nrwl Nx!
      </h1>
      <img width="300" src="assets/nx-logo.png">
    </div>

    <h2 style="text-align:center; background-color: #74FAA2; color: #22424; font-family: Fira Mono">RCVR_</h2>

    <player></player>
    <router-outlet></router-outlet>

  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
