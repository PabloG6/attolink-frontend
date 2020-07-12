import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, state, style, animate, query, animateChild, group } from '@angular/animations';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.scss'],
  animations: [
    trigger("displayError", [
      transition(":enter", [
        group([
          query('@displayErrorText', [
            animateChild(),
          ]),
          style({height: "0", opacity: 0}),
          animate('250ms ease-in-out', style({height: "100%", opacity: 1})),
        ])
      ]),

      transition(":leave", [
        group([
          query('@displayErrorText', [
            animateChild(),
          ]),
  
          style({
            height: '100%',
            opacity: '1'                 // added
        }),
          animate("250ms ease-in-out", style({height: "0", opacity: 0}))
        ])
      ]),

    

    ]),

    trigger("displayErrorText", [
      transition(':enter', [
        style({opacity: 0, height: '*', fontWeight: '*'}),
        animate('250ms 175ms ease-in-out', style({opacity: 1, height: '100%', fontWeight: 600}))
      ]),
      transition(':leave', [
        style({opacity: 1, height: '*', }),
        animate('150ms 100ms ease-in-out', style({opacity: 0, height: '0',}))
      ]),

    ])
  ]

})
export class ErrorCardComponent implements OnInit {

  @Input() public color: string;
  @Input() public message: string;
  @Input() public display: boolean;
  @Output() displayError: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  close() {
    this.displayError.emit();
  }

  onDisplayAnimationStart(event: AnimationEvent) {
    console.log(event);

  }

  
  onDisplayAnimationEnd(event: AnimationEvent) {
  }

}
