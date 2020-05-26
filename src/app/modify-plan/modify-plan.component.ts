import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import { TPlan, TResponseList, TProduct, TResponse, TUser } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modify-plan',
  templateUrl: './modify-plan.component.html',
  styleUrls: ['./modify-plan.component.scss']
})
export class ModifyPlanComponent implements OnInit {
  private _subsink: SubSink = new SubSink();
  productList: TProduct[] = [];
  constructor(private _api: ApiService, private _cookieService: CookieService) { }
  ngOnInit(): void {

    
    this._subsink.sink = this._api.subscriptions.list_plans().subscribe((response: TResponseList<TPlan>) => {
      this.productList = this._api.makeProductList(response.data);


    });
  }

  subscribe(plan: TPlan): void {
    console.log(plan);
  }

}
