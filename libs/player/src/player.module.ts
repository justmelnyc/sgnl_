import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PlayerComponent } from './player/player.component';

export const playerRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PlayerComponent],
  exports: [PlayerComponent]
})
export class PlayerModule {}
