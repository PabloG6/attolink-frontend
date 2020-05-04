import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AttoSubscription } from '../models';
import { MdcListSelectionChange, MdcSelectChange, MdcSelect } from '@angular-mdc/web';
import { Elements, Element as StripeElement, StripeService, ElementsOptions } from 'ngx-stripe';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('selectSub', {static: true}) mdcSelect: any;
  showPassword: boolean = false;
  priceSubscriptions: Array<AttoSubscription> = [
    {name: "Free", price: 0,},
    {name: "Basic", price: 9.99},
    {name: "Premium", price: 25.00},
    {name: "Enterprise", price: 99.00}
  ]

  elements: Elements;
  card: StripeElement;

  elementsOptions: ElementsOptions = {
  locale: 'en'
  }
  priceMap = {
    "Free": 0,
    "Basic": 10,
    "Enterprise": 99,
    "Premium": 25
  }


  selectedPrice = 0;

  constructor(private _api: ApiService, 
    private _stripeService: StripeService,
    private _fb: FormBuilder) {

      this._fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        
      })
     }


  ngOnInit(): void {
    this._stripeService.elements(this.elementsOptions).subscribe((elements) => {
      this.elements = elements;
      if(!this.card) {

        this.card = this.elements.create('card', {style: {
          
          base: {
            fontSize: '16px',
            fontFamily: '"Work Sans", sans-serif',
            fontSmoothing: "antialiased",
            lineHeight: '56px'
            
          }
        }});


      }

    });


  }

  ngAfterViewInit() {
    this.mdcSelect.value = "Free";
  }


  onSelectionChange($event: MdcSelectChange) {
  this.selectedPrice = this.priceMap[$event.value]
  if($event.value == "Free") {
    this.card.unmount();

  } else {
    this.card.mount("#stripe-card-element");
  }
  }

  ngOnDestroy() {

  }
  



}
