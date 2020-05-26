import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TPlan, TServices, TProduct, TUser, TResponse } from '../models';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss']
})
export class PricingCardComponent implements OnInit, OnChanges {

  @Input() public product: TProduct;
  @Input() public callToAction: string;
  @Input() public isSelected: false;
  @Output() subscribeClick: EventEmitter<any> = new EventEmitter();
  service: TServices;
  $user: Observable<TResponse<TUser>>
  plan: TPlan;
  public cacheLimitPretty: {limit: number, unit: string};
  constructor(private _router: Router, private _api: ApiService) { 
    this.$user = this._api.userInfo;

  } 
  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.product) {
      console.log(this.product);
      this.service = this.product[0];
      this.plan = this.product[1];

    }

    if(!isNullOrUndefined(this.product[0].cache_limit))
      this.cacheLimitPretty = this.convertBytes(this.product[0].cache_limit.limit, this.product[0].cache_limit.unit);

    
  }



 public convertBytes(size: number, type: string) {
   let convertedSize = 0;
    if(type.toLowerCase() == "mb") {
      convertedSize = size/Math.pow(1024, 2);
    }

    if(type.toLowerCase() == "gb") {
      convertedSize = size/Math.pow(1024, 3);
    }
    return {limit: convertedSize, unit: type.toUpperCase()}
  }

  subscribe(): void {
    this.subscribeClick.emit(this.plan);
  }

  get nickname(): string {
   return this.plan.nickname.toLowerCase()
  }
}
