import { NgModule, Provider } from '@angular/core'
import { CommonModule } from '@angular/common'
// import { AsyncLocalStorage } from 'angular-async-local-storage'

import { Signal } from './services/signal';

export function coreServices(): Provider[] {
  return [Signal];
}
@NgModule({
  imports: [CommonModule],
  providers: coreServices()
})
export class SignalModule {}
