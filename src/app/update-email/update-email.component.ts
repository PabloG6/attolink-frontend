import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TGenericAccount } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {

  updateEmailGroup: FormGroup;
  loading: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<UpdateEmailComponent>, private _fb: FormBuilder, private _api: ApiService) {
    this.updateEmailGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {


  }


  ok() {
    this.loading = true;
    this._api.email.
    update_email({email: this.updateEmailGroup.value.email, password: this.updateEmailGroup.value.password}).subscribe(() => {
      this._dialogRef.close();
      this.loading = false;

    }, () => {
      this.loading = false;
    })
  }


}
