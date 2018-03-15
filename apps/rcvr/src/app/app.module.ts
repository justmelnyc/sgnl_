import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { PlayerModule } from "@sgnl/player";

@NgModule({
  imports: [BrowserModule, PlayerModule, NxModule.forRoot(), RouterModule.forRoot([], { initialNavigation: 'enabled' })],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
