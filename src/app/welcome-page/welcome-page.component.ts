import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdcDialog } from '@angular-mdc/web';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _dialog: MdcDialog) { }


  ngOnInit(): void {
    let dialogRef;
    const activatedRoute$ = this._activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if(queryParams["login"]) {
        dialogRef = this._dialog.open(LoginModalComponent, )
      }

    });

    this._subscriptions.push(activatedRoute$);


  }

  public login() {
  }

  public signup() {
    this._router.navigate(["/signup"]);
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
