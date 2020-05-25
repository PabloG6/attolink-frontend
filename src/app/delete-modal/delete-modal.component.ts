import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';
import { TKey } from '../models';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DeleteModalComponent>, 
    private _api: ApiService, 
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
  }

  delete() {
    console.log(this.data);
   this.data.observable.subscribe(() => {
     console.log("check for success");
    this._dialogRef.close({success: true});

   })
  }
}