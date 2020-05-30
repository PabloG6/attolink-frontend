import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import { TPlan, TResponseList, TProduct, TResponse, TUser, TSubscription } from '../models';
import { Observable } from 'rxjs';
import { MdcSnackbar } from '@angular-mdc/web';

@Component({
  selector: 'app-modify-plan',
  templateUrl: './modify-plan.component.html',
  styleUrls: ['./modify-plan.component.scss']
})
export class ModifyPlanComponent implements OnInit {
  private _subsink: SubSink = new SubSink();
  private user: TUser;
  loading: boolean;
  productList: TProduct[] = [];
  constructor(private _api: ApiService, 
              private _cookieService: CookieService,
              private _mdcSnackBar: MdcSnackbar) { }
  ngOnInit(): void {
    this._api.userInfo.subscribe(user => {
      this.user = user;
    })
   
    this.loading = true;
    this._subsink.sink = this._api.subscriptions.list_plans().subscribe((response: TResponseList<TPlan>) => {
      this.productList = this._api.makeProductList(response.data);
      this.loading = false;

    }, (error) => {
      this.loading = false;
    });
  }

  subscribe(plan: TPlan): void {
    this._api.subscriptions.update({plan_id: plan.id}).subscribe((response: TResponse<TSubscription>) => {
      this.user.plan = response.data.nickname;
      console.log('this.user ', this.user);
      console.log('response.data', response.data);
      this._api.setUserInfo(this.user);
      this._mdcSnackBar.open('We\'ve updated your subscription!', 'OK');

    }, (error) => {
      this._mdcSnackBar.open('Whoops! An unexpected error has occured on our part! Try again later', 'OK');
    });
  }

}
