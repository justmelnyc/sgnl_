import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeyModule, HotkeysService } from 'angular2-hotkeys';
import { ImageZoomModule } from 'angular2-image-zoom';
import { StarReviewComponent } from './star-review/star-review.component';

export function CommonComponents() {
  return [StarReviewComponent];
}
export function CommonModules() {
  return [CommonModule, HotkeyModule, ImageZoomModule];
}

export function coreServices(): Provider[] {
  return [HotkeysService];
}

@NgModule({
  imports: CommonModules(),
  declarations: CommonComponents(),
  exports: CommonComponents(),
  providers: coreServices()
})
export class CommonUiModule {}
