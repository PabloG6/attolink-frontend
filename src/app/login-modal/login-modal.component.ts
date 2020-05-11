import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MdcDialogRef } from '@angular-mdc/web';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  showPassword: boolean = false;
  loginForm: FormGroup;
  constructor(private _api: ApiService, private _router: Router, 
    private _matDialogRef: MatDialogRef<LoginModalComponent>,
    private _fb: FormBuilder) { 
      this.loginForm = this._fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, ]]
      })

    }

  ngOnInit(): void {
    // this._dialogRef.afterClosed().subscribe(() => {
    //   this._router.navigate(["/"], {queryParams: {login: null}})
    // })
  }


  login() {
    this._api.user.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(_ => {
      this._router.navigate(['dashboard']);
    })
  }

  close() {
    this._matDialogRef.close();
  }

}
