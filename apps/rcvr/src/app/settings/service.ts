import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators/tap';

const SETTINGS_LOCATION = "http://localhost:5000/api/config";
const SETTINGS_KEY = "configuration";

export class AppSettings {
  node: number = 0;
  isFromLocalStorage: boolean = false;
}

@Injectable()
export class AppSettingsService {
  constructor(private http: HttpClient) {
  }

  getSettings(): Observable<AppSettings> {
    const settings = localStorage.getItem(SETTINGS_KEY);

    if (settings) {
      let ret: AppSettings = null;
      ret = JSON.parse(settings);
      ret.isFromLocalStorage = true;
      return of(ret);
    }
    else {
      return this.http.get<AppSettings>(SETTINGS_LOCATION)
        .pipe(
          tap(settings => {
            if (settings) {
              this.saveSettings(settings);
            }
          }),
          catchError(
            this.handleError<AppSettings>('getSettings',
              new AppSettings()))
        );
    }
  }

  saveSettings(settings: AppSettings) {
    localStorage.setItem(SETTINGS_KEY,
      JSON.stringify(settings));
    console.log('setting set to: '+ settings.node )
  }

  deleteSettings(): void {
    localStorage.removeItem(SETTINGS_KEY);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Log the error to the console
      switch (error.status) {
        case 404:
          console.error("Can't find file: " +
            SETTINGS_LOCATION);
          break;
        default:
          console.error(error);
          break;
      }

      // Return default configuration values
      return of(result as T);
    };
  }
}
