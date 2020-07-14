import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../validators/confirm_password.validator';
import { ApiService } from '../api/api.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MdcSnackbar } from '@angular-mdc/web';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  id: string;
  passwordResetGroup: FormGroup;
  loading: boolean;
  displayError: boolean;
  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _router: Router,
    private _fb: FormBuilder,
    private _snackbar: MdcSnackbar,
    private _cookieService: CookieService,
    private _api: ApiService) { 
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.passwordResetGroup = this._fb.group({newPassword: ['', [Validators.required]], 
    confirmPassword: ['', [Validators.required]]}, {validators: PasswordValidator.confirm_password})
    
  }

  ngOnInit(): void {
  }


  resetError() {
    this.displayError = false;
  }
  confirmPassword() {
    this.loading = true;
    this._api.password.forgot_password(this.id, {password: this.passwordResetGroup.value.newPassword}).subscribe((response: any) => {
      //todo force login here.
      this._cookieService.set(environment.atto_cookie,
        response.token);
      this._router.navigate(['dashboard'])
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this._snackbar.open('An internal server error has occured', 'OK');

    })
  }

}
