import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TGenericModal } from '../models';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: TGenericModal, private _dialogRef: MatDialogRef<GenericModalComponent>) { }

  ngOnInit(): void {
  }

  callback(): void {
    this.data.onConfirmCallback();
    console.log("confirm callback");
    console.log(this.data);
    if(this.data.closeOnSuccess) {
      this._dialogRef.close();
    }
  }


}
