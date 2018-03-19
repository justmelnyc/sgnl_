import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signal } from '@sgnl/signal';

export function coreServices(): Provider[] {
  return [Signal];
}
@NgModule({
  imports: [CommonModule],
  providers: coreServices()
})
export class SignalModule {}
