import { Component, OnInit } from '@angular/core';
import { Plan } from '../models/pricing_plan';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor() { }
  public pricingPlans: Plan[] = [{
    preview_limit: 100,
    cache_limit: {limit: 104_857_600, unit: "MB"},
    cache_request_limit: 500,
    price: 0,
    overage_fees: 0,
    description: "Personal Use",
    title: "Free",


  }, {
    preview_limit: 3000,
    cache_limit: {limit: 1_073_741_824, unit: "GB"},
    cache_request_limit: 4000,
    price: 10,
    overage_fees: 0.14,
    description: "Low Volume",
    title: "Basic",
    

  },

  {
    preview_limit: 15000,
    cache_limit: {limit: 3_221_225_472, unit: "GB"},
    cache_request_limit: 8000,
    price: 20,
    overage_fees: 0.10,
    description: "Medium Volume",
    title: "Premium",
    

  },

  {
    preview_limit: 100000,
    cache_limit: {limit: 16_106_127_360, unit: "GB"},
    cache_request_limit: 50000,
    price: 75,
    overage_fees: 0.06,
    description: "High Volume",
    title: "Enterprise"
  }
];

  ngOnInit(): void {
  }

}
