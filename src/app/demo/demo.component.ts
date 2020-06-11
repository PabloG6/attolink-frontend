import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  demoControl: FormControl = new FormControl();
  constructor(private _http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  displayPreview() {

  const url = this.demoControl.value || 'https://example.com'; 
  console.log(this.demoControl);
  this._http.get('/v1/preview', {
    params: {url: url},

    headers: new HttpHeaders().append('apikey', 'ddaf02d1-11cd-49c0-a4e6-3a13976315d3',) 
  }).subscribe((response) => {
    console.log(response);
  })
  }

}
