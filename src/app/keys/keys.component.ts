import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TKey, TResponseList } from '../models';
import { Observable, from, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit, OnDestroy {




  $keys: Observable<TResponseList<TKey>>
  displayedColumns: string[] = ["date created", "keys"]
  constructor(private _api: ApiService, private _matDialog: MatDialog) {
    this.$keys = this._api.apikey.list();
  }


  ngOnInit(): void {
  }

  create(): void {
    this._api.apikey.create().subscribe(_ => {
      this.$keys = this._api.apikey.list()


    });
  }

  delete(key: TKey): void {
    this._matDialog.open(DeleteModalComponent, {data: key, width: '360px', autoFocus: false, disableClose: true}).afterClosed().subscribe(val => {
      if(val.success) {
        this.$keys = this._api.apikey.list();
      }
    });
  }
  ngOnDestroy(): void {
  }


  
}
