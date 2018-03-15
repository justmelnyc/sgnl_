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

export const playerRoutes: Route[] = [];

export interface IFeed {
  id: number;
  src: string;
  name: string;
  twitter?: string;
  selected?: boolean;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule
  ],
  declarations: [PlayerComponent, SigPipComponent],
  exports: [PlayerComponent, SigPipComponent]
})
export class PlayerModule {}
