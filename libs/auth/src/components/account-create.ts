import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-create',
  template: `
    <div class="cat__pages__login">
      <div class="cat__pages__login__block">
        <div class="row">
          <div class="col-xl-12">
            <div class="cat__pages__login__block__inner">
              <div class="cat__pages__login__block__form">
                <br />
                <account-form></account-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class AccountCreateComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  }

}
