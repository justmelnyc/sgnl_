import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Signal } from '@sgnl/signal';

@Component({
  selector: 'star-review',
  template: `
    <div class="ui">
     
      <button (click)="starHandler(10)">set status</button>
      <div *ngFor="let star of stars | async">
        {{ star.account_id }} gave {{ star.installation_id }} {{ star.value }} stars
      </div>
      <h3>Post your Review</h3>
      <fieldset class="rating">
        <ng-container  *ngFor="let num of [5, 4, 3, 2, 1]">
          <!-- full star -->
          <input (click)="starHandler(num)"
                 [id]="'star'+num"
                 [value]="num-0.5"
                 name="rating"
                 type="radio" />

          <label class="full" [for]="'star'+num"></label>

          <!-- half star -->
          <input (click)="starHandler(num-0.5)"
                 [value]="num-0.5"
                 [id]="'halfstar'+num"
                 name="rating"
                 type="radio"  />
          <label class="half" [for]="'halfstar'+num"></label>
        </ng-container>
      </fieldset>
    </div>
    
  `,
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {
  @Input() account;
  @Input() installation;

  stars: Observable<any>;
  // avgRating: Observable<any>
  // status: any

  constructor(private signal: Signal) {}

  ngOnInit() {
    this.stars = this.signal.getAccountStatus('prism_account_001');
    console.log(this.installation, this.account, this.stars);

    // this.status = this.signal.getInstallationStatus(this.installation);

    // this.avgRating = this.stars.map(arr => {
    //   const ratings = arr.map(v => v.value)
    //   return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    // })
  }

  async starHandler(value) {
    await this.signal.setStatus(value);
  }
}
