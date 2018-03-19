import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorage } from '@sgnl/utils';

@NgModule({
  imports: [CommonModule],
  providers: [LocalStorage]
})
export class UtilsModule {}
