import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TServices, TProduct, TResponseList, TPlan, typeServiceMap, TProductMap } from '../models';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, AfterViewInit {
  loading = false;
  productsList = []
  private _subsink: SubSink = new SubSink();
  constructor(private _api: ApiService, private _router: Router) {
    this.productsList = environment.products
    
   }



   products: TProductMap = {};
  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 100)
   
    
  }

  ngAfterViewInit(): void {

  }


  subscribe(plan: TPlan): void {
    this._router.navigate(['signup'], {queryParams: {plan_id: plan.id, amount: plan.amount}})

  }

}
