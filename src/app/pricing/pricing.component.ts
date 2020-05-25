import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TServices, TProduct, TResponseList, TPlan, typeServiceMap, TProductMap } from '../models';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, AfterViewInit {
  loading = false;
  productsList: TProduct[] = []
  private _subsink: SubSink = new SubSink();
  constructor(private _api: ApiService) {

   }



   products: TProductMap = {};
   $pricing: Observable<TProduct[]>;
  ngOnInit(): void {
    this.loading = true;
    this.$pricing = this._api.subscriptions.list_plans().pipe(map((response: TResponseList<TPlan>) => {
      const productsList: TProduct[] = []
      response.data.forEach((plan) => {
        const val: TServices = typeServiceMap[plan.nickname]
        const tProduct: TProduct = [val, plan];
        
        productsList.push([val, plan]);
      });
      productsList.sort((a: TProduct, b: TProduct) => a[1].amount - b[1].amount)
      return productsList;
    }));

    this._subsink.sink = this.$pricing.subscribe((response) => {
      this.loading = false;
      this.productsList = response;
    })
    
  }

  ngAfterViewInit(): void {

  }


}
