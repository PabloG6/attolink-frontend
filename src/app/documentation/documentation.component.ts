import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documentation',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  jsonExample = {data: { description: "Example Domain", 
                   images: [], 
                   original_url: "https://example.com",
                   title: "Example Domain", 
                   website_url: "example.com" } };

  constructor(private _http: HttpClient) { 
  }

  ngOnInit(): void {

  }

  onMarkdownLoad($event):void {
    console.log($event);
  }

  onMarkdownError($event): void {
    console.log($event);
  }
}
