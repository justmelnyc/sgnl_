import { Component, OnInit } from '@angular/core';
import {AppSettings, AppSettingsService} from './service'

@Component({
  selector: 'rcvr-settings',
  template:  `
    <div *ngIf="settings">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <div class="panel-title">
            <h3>Default Settings</h3>
          </div>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label for="defaultPrice">Default Price</label>
            <input id="defaultPrice" class="form-control" [(ngModel)]="settings.node" />
          </div>
          <!--<div class="form-group">-->
            <!--<label for="defaultUrl">Default URL</label>-->
            <!--<input id="defaultUrl" class="form-control" [(ngModel)]="settings.defaultUrl" />-->
          <!--</div>-->
          <hr>
          <div class="form-group">
            <label for="isFromLocalStorage">From Local Storage?</label>
            <input id="isFromLocalStorage" class="form-control" [(ngModel)]="settings.isFromLocalStorage" />
          </div>
        </div>
        <div class="panel-footer">
          <button class="btn btn-primary" (click)="saveSettings()">Save</button>
          <button class="btn btn-primary" (click)="deleteSettings()">Delete Settings</button>
          <button class="btn btn-default">Cancel</button>
        </div>
      </div>
    </div>
  
  
  `,
  styles: [``]
})
export class SettingsComponent implements OnInit {

  settings: AppSettings;

  constructor(private appSettingsService: AppSettingsService) {
  }
  ngOnInit(): void {
    this.appSettingsService.getSettings()
      .subscribe(settings => this.settings = settings);
  }

  saveSettings(): void {
    this.appSettingsService.saveSettings(this.settings);
  }

  deleteSettings(): void {
    this.appSettingsService.deleteSettings();
  }

}
