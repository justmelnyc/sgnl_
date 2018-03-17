import { Component } from '@angular/core';


@Component({
  selector: 'sig-loader',
  template: `
    <div class="vp-spin">
      <svg class="vp-spin-trace" viewBox="0 0 50 50">
        <circle cx="50%" cy="50%" r="20"></circle>
      </svg>
      <svg class="vp-spin-circle" viewBox="0 0 50 50">
        <circle cx="50%" cy="50%" r="20"></circle>
      </svg>
    </div>
  `,
  styles: [`

    .player .vp-spin {
      width: 18%;
      max-width: 140px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%) scale(1);
      transform: translate(-50%,-50%) scale(1);
      -webkit-transition: opacity .1s,-webkit-transform .25s cubic-bezier(.17,.88,.32,1.28);
      transition: opacity .1s,-webkit-transform .25s cubic-bezier(.17,.88,.32,1.28);
      transition: opacity .1s,transform .25s cubic-bezier(.17,.88,.32,1.28);
      transition: opacity .1s,transform .25s cubic-bezier(.17,.88,.32,1.28),-webkit-transform .25s cubic-bezier(.17,.88,.32,1.28);
    }
    .player, .player *, .player ::after, .player ::before {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }


    .player .vp-spin-trace {
      fill: none;
      stroke-width: 3%;
      stroke: rgba(23,35,34,.75);
      stroke-opacity: .6;
    }

    .player .vp-spin-circle {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      fill: none;
      stroke-width: 3%;
      stroke: #fcfcfc;
      stroke-opacity: 1;
      stroke-linecap: round;
      stroke-dasharray: 200;
      stroke-dashoffset: 200;
      -webkit-animation: rotate 2s linear .25s infinite,dash 1.5s ease-in-out .25s infinite;
      animation: rotate 2s linear .25s infinite,dash 1.5s ease-in-out .25s infinite;
    }
  
  `]
})
export class LoaderComponent {


}
