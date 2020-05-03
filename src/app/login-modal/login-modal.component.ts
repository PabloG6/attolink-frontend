import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MdcDialogRef } from '@angular-mdc/web';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(private _api: ApiService, private _dialogRef: MdcDialogRef<any>, private _router: Router) { }

  ngOnInit(): void {
    this._dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(["/"], {queryParams: {login: null}})
    })
  }


  signUp() {
    
  }

}
