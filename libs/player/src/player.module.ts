import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';



import { PlayerComponent } from './player/player.component';

export const playerRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule],
  declarations: [PlayerComponent],
  exports: [PlayerComponent]
})
export class PlayerModule {}
