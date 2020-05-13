import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { TWhiteList } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.scss']
})
export class WhitelistComponent implements OnInit {
  $whitelist: Observable<any>
  displayedColumns: string[] = ["date created", "keys"]

  constructor(private _api: ApiService, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.$whitelist = this._api.whitelist.list();
  }

  create() {
    this._api.apikey.create().subscribe(_ => {
      this.$whitelist = this._api.apikey.list()


    });
  }


  delete(whitelist: TWhiteList): void {
    this._matDialog.open(DeleteModalComponent, {data: whitelist, width: '360px', autoFocus: false, disableClose: true}).afterClosed().subscribe(val => {
      if(val.success) {
        this.$whitelist = this._api.whitelist.list();
      }
    });
  }

  

  updateRules() {

  }
  onSelectionChange($event): void {

  }



  

}
