import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AttoSubscription, TResponse, TUser } from '../models';
import { CookieService } from 'ngx-cookie-service';
import { MdcListSelectionChange, MdcSelectChange, MdcSelect } from '@angular-mdc/web';
import { Elements, Element as StripeElement, StripeService, ElementsOptions } from 'ngx-stripe';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('selectSub', { static: true }) mdcSelect: any;
  showPassword: boolean = false;
  priceSubscriptions: Array<AttoSubscription> = [
    { name: "Free", price: 0, },
    { name: "Basic", price: 9.99 },
    { name: "Premium", price: 25.00 },
    { name: "Enterprise", price: 99.00 }
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
  signUpFormGroup: FormGroup;

  constructor(private _api: ApiService,
    private _stripeService: StripeService,
    private _cookieService: CookieService,
    private _router: Router,
    private _fb: FormBuilder) {

    this.signUpFormGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    })
  }


  ngOnInit(): void {
    this._stripeService.elements(this.elementsOptions).subscribe((elements) => {
      this.elements = elements;
      if (!this.card) {

        this.card = this.elements.create('card', {
          style: {

            base: {
              fontSize: '16px',
              fontFamily: '"Work Sans", sans-serif',
              fontSmoothing: "antialiased",
              lineHeight: '56px'

            }
          }
        });


      }

    });


  }

  ngAfterViewInit() {
    this.mdcSelect.value = "Free";
  }


  onSelectionChange($event: MdcSelectChange) {
    this.selectedPrice = this.priceMap[$event.value]
    if ($event.value == "Free" && this.card) {
      this.card.unmount();

    } else if (!isNullOrUndefined(this.card)) {
      this.card.mount("#stripe-card-element");
    }
  }

  signup() {
    this._api.user.signup(this.signUpFormGroup.value.email, this.signUpFormGroup.value.password).subscribe((response: TResponse<TUser>) => {
      console.log(response);
      this._cookieService.set(environment.atto_cookie, response.data.token)
      this._router.navigate(['dashboard'])
    }, (error) => {

    });
  }
  ngOnDestroy() {

  }




}
