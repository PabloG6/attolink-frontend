import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  jsonExample = '{"data":{"description":"Example Domain","images":[],"original_url":"https://example.com","title":"Example Domain","website_url":"example.com"}}';
  
  constructor() { }

  ngOnInit(): void {
  }

}
