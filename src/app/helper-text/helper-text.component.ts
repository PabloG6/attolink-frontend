import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-helper-text',
  templateUrl: './helper-text.component.html',
  styleUrls: ['./helper-text.component.scss'],
  animations: [
    trigger("showError", [
      transition(':enter', [
        style({transform: 'translateY(-100%)', opacity: 0}),
        animate('350ms ease-in-out', style({transform: 'translateY(0)', opacity: 1}))
      ]),

      transition(':leave', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate('350ms ease-in-out', style({transform: 'translateY(-100%)', opacity: 0}))
      ])
    ])
  ]
})
export class HelperTextComponent implements OnInit {
  @Input() message: string;
  @Input() show: string;

  constructor() { }

  ngOnInit(): void {
  }

}
