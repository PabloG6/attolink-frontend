import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  result: any;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  loading: boolean;

  demoControl: FormControl = new FormControl('');
  constructor(private _http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  displayPreview() {
    this.loading = true;
  const url = this.demoControl.value || 'https://example.com';
  this._http.get('/v1/preview', {
    params: {url: url},

    headers: new HttpHeaders().append('apikey',environment.api_key,) 
  }).subscribe((response) => {
    this.loading = false;
    this.result = response;
  }, (error) => {
    this.loading = false;
  })
  }

}
