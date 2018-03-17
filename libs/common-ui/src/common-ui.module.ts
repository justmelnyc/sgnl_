import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeyModule, HotkeysService } from 'angular2-hotkeys';
import { ImageZoomModule } from 'angular2-image-zoom';

@NgModule({
  imports: [CommonModule, HotkeyModule, ImageZoomModule],
  providers: [HotkeysService],
  exports: []
})
export class CommonUiModule {}
