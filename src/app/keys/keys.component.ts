import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TKey, TResponseList } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {

  $keys: Observable<TResponseList<TKey>>
  constructor(private _api: ApiService) { 
    this.$keys = this._api.apikey.list()
  }

  ngOnInit(): void {
  }

  create(): void {
    this._api.apikey.create().subscribe(_ => {
      this.$keys = this._api.apikey.list();
    });

  }

  
}
