import { Component, OnInit } from '@angular/core';
import {Hotkey, HotkeysService} from "angular2-hotkeys";

@Component({
  selector: 'app-root',
  template: `    
    <h2 class="heading">CTRL_</h2>
    <h2 class="heading">Dispatches Commands</h2>
    <sig-player [video]="'assets/media/nike.mp4'"></sig-player>
    
    <router-outlet></router-outlet>
  `,
  styles: [
    `
    .heading {
      position: relative;
      text-align: center;
      /*color: #FADD79;*/
      color: #74FAA2;
      /*background-color: #242424;*/
      font-family: Fira Mono;
      z-index: 1000;
    }
  `
  ]
})
export class AppComponent implements OnInit {
  constructor(private _hotkeysService: HotkeysService) {
    this._hotkeysService.add(new Hotkey('meta+shift+g', (event: KeyboardEvent): boolean => {
      console.log('Typed hotkey');
      return false; // Prevent bubbling
    }));
  }

  ngOnInit() {}
}
