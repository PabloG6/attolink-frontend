import { Component, OnInit, Input } from '@angular/core';
import {Plan} from './../models/pricing_plan';
@Component({
  selector: 'app-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss']
})
export class PricingCardComponent implements OnInit {

  @Input() public pricePlan: Plan;
  public cacheLimitPretty: {limit: number, unit: string};
  constructor() { 
    console.log(this.pricePlan);
  }

  ngOnInit(): void {
    this.cacheLimitPretty = this.convertBytes(this.pricePlan.cache_limit.limit, this.pricePlan.cache_limit.unit);

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
}
