import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  showPassword: boolean = false;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _dialog: MatDialog) { }


  ngOnInit(): void {
    const activatedRoute$ = this._activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if(queryParams["login"]) {
        this._dialog.open(LoginModalComponent, {width: '360px',})
      }

    });

    this._subscriptions.push(activatedRoute$);


  
  }

  public login() {
    this._dialog.open(LoginModalComponent, {width: '360px'})
  }

  public signup() {
    this._router.navigate(["/signup"]);
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
