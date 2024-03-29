import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { Observable, Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { isNullOrUndefined } from 'util';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  private _subsink = new SubSink();
  dialogRef: MatDialogRef<LoginModalComponent>;
  showPassword: boolean = false;
  constructor(private _router: Router, 
    private _activatedRoute: ActivatedRoute, private _dialog: MatDialog, private _cookieService: CookieService) { }


  ngOnInit(): void {
    const activatedRoute$ = this._activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if(queryParams["login"]) {
         this.dialogRef = this._dialog.open(LoginModalComponent, {width: '360px',})
      }

    });


    this._subsink.sink = activatedRoute$

  
  }

  public login() {
    this.dialogRef = this._dialog.open(LoginModalComponent, {width: '360px'})
  }

  public signup() {
    this._router.navigate(["/signup"]);
  }

  scrollTo(element: HTMLElement) {
    element.scrollIntoView();
  }


  ngOnDestroy() {
    this._subsink.unsubscribe(); 
    if(!isNullOrUndefined(this.dialogRef)) {
      this.dialogRef.close();

    }
  }


  get token() {
    return this._cookieService.get(environment.atto_cookie);
  }
}
