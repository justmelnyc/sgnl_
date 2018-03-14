import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      <h1>
        Welcome to an Angular CLI app built with Nrwl Nx!
      </h1>
      <img width="300" src="assets/nx-logo.png">
    </div>

    <h2 style="background-color: #FADD79; color: #242424; font-family: Fira Mono">CTRL_</h2>

    An open source toolkit for enterprise Angular applications.

    Nx is designed to help you create and build enterprise grade Angular applications. It provides an opinionated approach to application project structure and patterns.

    <h2>Quick Start & Documentation</h2>

    <a href="https://nrwl.io/nx">Watch a 5-minute video on how to get started with Nx.</a>
    <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
