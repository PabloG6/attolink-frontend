import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MdcDialogRef } from '@angular-mdc/web/dialog';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { TResponse, TUser } from '../models';
import { SubSink } from 'subsink';
import { MdcSnackbar } from '@angular-mdc/web';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {
  showPassword: boolean = false;
  loginForm: FormGroup;
  displayError: boolean;
  loading: boolean;
  private _subsink: SubSink = new SubSink();
  constructor(private _api: ApiService, private _router: Router, 
    private _matDialogRef: MatDialogRef<LoginModalComponent>,
    private _cookieService: CookieService,
    private _mdcSnackBar: MdcSnackbar,
    private _fb: FormBuilder) { 
      this.loginForm = this._fb.group({
        email: ['genome1@gmail.com', [Validators.required, Validators.email]],
        password: ['password', [Validators.required, ]]
      })

    }


  ngOnInit(): void {
 
  }


  login() {
    this.loading = true;

      
      this._subsink.sink = this._api.user.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response: TResponse<TUser>) => {
        this.loading = false;
        this._cookieService.set(environment.atto_cookie, response.data.token)
        this._router.navigate(['dashboard']);
        this._matDialogRef.close();
      }, () => {
        //todo fix this as well looooool
        this.loading = false;
        this._mdcSnackBar.open('Incorrect email or password', 'OK');
      })

    
  }

  close() {
    this._matDialogRef.close();
  }

  ngOnDestroy(): void {
    this._subsink.unsubscribe();
  }
}
