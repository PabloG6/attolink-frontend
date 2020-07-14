import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TUser, TGenericModal, TGenericAccount } from '../models';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MdcTextField, MdcDialog, MdcSnackbar } from '@angular-mdc/web';
import { Router } from '@angular/router';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UpdateEmailComponent } from '../update-email/update-email.component';
import { PasswordValidator } from '../validators/confirm_password.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { PromptDialogComponent } from '../prompt-dialog/prompt-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  emailControl: FormControl = new FormControl('', [Validators.email, Validators.required]);
  emailFocus: boolean;
  passwordErrorMessage: string = "Unable to update your password. The server may be down or is currently unable to process your request.";
  passwordFormGroup: FormGroup;
  loadingEmail: boolean;
  loadingDelete: boolean;
  loadingPassword: boolean;
  @ViewChild("email") emailTextField: MdcTextField;
  user: TUser;
  constructor(
    private _api: ApiService, 
    private _router: Router,
    private _mdcDialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
    private _mdcSnackBar: MdcSnackbar,
    private _cookieService: CookieService,
    private _fb: FormBuilder) {
    this.user = this._api.getUser();
    this.emailControl.setValue(this.user.email);
    console.log(this.user);
    this.passwordFormGroup = _fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: [PasswordValidator.confirm_password],  });

  }

  ngOnInit(): void {
    


  }

  onfocus($event) {
    this.emailFocus = true;
  }



  onblur($event) {

    if (this.emailControl.invalid && this.emailControl.value != this.user.email) {
      //reset the email
      this.emailControl.setValue(this.user.email);

    }

  }


  get oldPasswordErrors() {
    return this.passwordFormGroup.controls.oldPassword.errors && this.passwordFormGroup.controls.oldPassword.errors.invalid_password
  }

  

  get valid() {
    console.log(this.emailControl);
    return this.emailControl.valid && this.emailControl.value != this.user.email
  }

  onFocus($event) {

  }


  submitChange(blob: any) {
    console.log("change");
    const data: TGenericAccount = {
      prompt: "Are you sure you'd like to change your email",

    }
    const dialogRef: MatDialogRef<UpdateEmailComponent> = this._mdcDialog.open(UpdateEmailComponent, { data: data, autoFocus: false, disableClose: true, maxWidth: '360px' });
    dialogRef.afterClosed().subscribe((isSuccess) => {
      this.loadingEmail = true;

      if (isSuccess) {
        this._api.email.update_email(blob).subscribe(() => {
          console.log("success");
          this.loadingEmail = false;

        }, (error) => {
          console.log("failed", error);
        })
      }
    }
      , () => { })


  }


  displayError() {
    this.passwordFormGroup.clearValidators();
    console.log(this.passwordFormGroup);
  }

  updateEmail() {

    this._mdcDialog.open(UpdateEmailComponent, { data: { email: this.user?.email, width: '100%', maxWidth: '560px' } });
  }

  updatePassword (formGroup: FormGroup) {
    const blob = {
      oldPassword: formGroup.value.oldPassword, 
      newPassword: formGroup.value.newPassword,
    }

    this.loadingPassword = true;
    this._api.password.update(blob).subscribe(() => {
      this.loadingPassword = false;
      this._mdcSnackBar.open("Successfully updated your password!", "OK");
    }, (response: HttpErrorResponse) => {
      this.loadingPassword = false;
      console.log(response);
      if(response.status == 401) {
        if(response.error.data.code == "invalid_password") {
         this.passwordFormGroup.controls.oldPassword.setErrors({invalid_password: true});
         return;
        }

        this.passwordFormGroup.setErrors({server_error: true});
        
      
      }
    })
  }

  forgotPassword() {
    this.loadingPassword = true;
    this._api.password.create({password: {email: this.user.email}}).subscribe(() => {
      this.loadingPassword = false;
    }, () => {
      this.loadingPassword = false;
    });
  }


  delete() {
    this._mdcDialog.open(PromptDialogComponent, {maxWidth: '360px', autoFocus: false}).afterClosed().subscribe((response) => {

      if(response==true) {
        this.loadingDelete = true;

        this._api.user.delete().subscribe(() => {
          this.loadingDelete = false;
          this._cookieService.delete(environment.atto_cookie);
          this._router.navigate(['/'])
        }, () => {
          this.loadingDelete = false;

          this._mdcSnackBar.open('An internal server error has occured, please try again later', 'OK')
        })
      }
    })
  }


}
