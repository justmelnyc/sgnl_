import { Component, Input, ElementRef, OnInit, PipeTransform, Pipe, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { VgAPI } from 'videogular2/core';

// Workaround until we can use UTC with Angular Date Pipe
@Pipe({ name: 'timecode' })
export class TimecodePipe implements PipeTransform {
  transform(value: number, format: string): string {
    const date = new Date(value);
    let result = format;
    let ss: string | number = date.getUTCSeconds();
    let mm: string | number = date.getUTCMinutes();
    let hh: string | number = date.getUTCHours();

    if (ss < 10) {
      ss = '0' + ss;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (hh < 10) {
      hh = '0' + hh;
    }

    result = result.replace(/ss/g, <string>ss);
    result = result.replace(/mm/g, <string>mm);
    result = result.replace(/hh/g, <string>hh);

    return result;
  }
}
