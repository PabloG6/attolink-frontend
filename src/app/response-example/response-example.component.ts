import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-response-example',
  templateUrl: './response-example.component.html',
  styleUrls: ['./response-example.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResponseExampleComponent implements OnInit {
  @Input() public example: string;
  constructor() { }

  ngOnInit(): void {
  }
  

}
