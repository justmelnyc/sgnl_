import { Component } from '@angular/core';

@Component({
  selector: 'sig-loader',
  template: `
    <div class="spinner"></div>

  `,
  styles: [
    `
      body{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: black;
      }

      .spinner{
        width: 80px;
        height: 80px;

        border: 2px solid grey;
        border-top:2px solid white;
        border-radius: 100%;

        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right: 0;
        margin: auto;

        animation: spin 1s infinite linear;
      }

      @keyframes spin {
        from{
          transform: rotate(0deg);
        }to{
           transform: rotate(360deg);
         }
      }



    `
  ]
})
export class LoaderComponent {}
