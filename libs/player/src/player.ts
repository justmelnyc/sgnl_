import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { FormsModule } from '@angular/forms';

import { PlayerComponent } from './player/player';
import { SigPipComponent } from './sig-pip/sig-pip';
import { LoaderComponent } from './components/loader';
import {TimecodePipe} from './pipes/timecode'
import {BufferComponent} from './components/buffer'


export const playerRoutes: Route[] = [];

export interface IFeed {
  id: number;
  src: string;
  name: string;
  twitter?: string;
  selected?: boolean;
}

export function playerComponents() {
  return [PlayerComponent, SigPipComponent, LoaderComponent, TimecodePipe, BufferComponent];
}
export function playerModules() {
  return [
    CommonModule,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule,
  ];
}

// export function coreServices(): Provider[] {
//   return [
//     VgAPI, VgFullscreenAPI, VgUtils, VgControlsHidden
//   ];
// }

@NgModule({
  imports: playerModules(),
  declarations: playerComponents(),
  exports: playerComponents()
})
export class PlayerModule {}
