import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import { TPlan, TResponseList, TProduct, TResponse, TUser, TSubscription } from '../models';
import { Observable } from 'rxjs';
import { MdcSnackbar } from '@angular-mdc/web';
import { environment } from 'src/environments/environment';

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
              private _mdcSnackBar: MdcSnackbar) {
                this.productList = environment.products;
               }
  ngOnInit(): void {
    this._api.userInfo.subscribe(user => {
      this.user = user;
    })
   

    
  }

  subscribe(plan: TPlan): void {
    this._api.subscriptions.update({plan_id: plan.id}).subscribe((response: TResponse<TSubscription>) => {
      this.user.plan = response.data.nickname;

      this._api.setUserInfo(this.user);
      this._mdcSnackBar.open('We\'ve updated your subscription!', 'OK');

    }, (error) => {
      this._mdcSnackBar.open('Whoops! An unexpected error has occured on our part! Try again later', 'OK');
    });
  }

}
