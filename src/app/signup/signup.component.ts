import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AttoSubscription } from '../models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false;
  priceSubscriptions: Array<AttoSubscription> = [
    {name: "Free", price: 0,},
    {name: "Basic", price: 9.99},
    {name: "Premium", price: 25.00},
    {name: "Enterprise", price: 99.00}
  ]
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
  }


  



}
