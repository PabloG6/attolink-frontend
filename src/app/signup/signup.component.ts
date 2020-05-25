import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AttoSubscription, TResponse, TUser, TPlan, TResponseList } from '../models';
import { CookieService } from 'ngx-cookie-service';
import { MdcListSelectionChange, MdcSelectChange, MdcSelect } from '@angular-mdc/web';
import { Elements, Element as StripeElement, StripeService, ElementsOptions } from 'ngx-stripe';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { concat } from 'rxjs';
import { PaymentMethodResult } from 'ngx-stripe/lib/interfaces/payment-intent';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('selectSub', { static: true }) mdcSelect: any;
  showPassword: boolean = false;
  priceControl: FormControl = new FormControl();
  plansList: TPlan[] = []
  elements: Elements;
  stripeFormControl: FormControl = new FormControl();
  card: StripeElement;
  isCardValid: boolean;
  private _subsink: SubSink = new SubSink();
  elementsOptions: ElementsOptions = {
    locale: 'en'
  }



  selectedPrice = 0;
  signUpFormGroup: FormGroup;
  constructor(private _api: ApiService,
    private _stripeService: StripeService,
    private _cookieService: CookieService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder) {

    this.signUpFormGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    })


    const plan_id = this._activatedRoute.snapshot.queryParamMap.get('plan_id');
    this.isCardValid = plan_id ? false: true;
    if(this._api.plans.length == 0) {
      const $pricing = this._api.subscriptions.list_plans().subscribe((response) => {
        this.plansList = response.data;
        this.plansList.sort((a, b) => a.amount - b.amount);
        const plan = this.plansList.find(plan => plan.id == plan_id) || this.plansList.find(plan => plan.nickname.toLowerCase() == "free")
        this.isCardValid = plan.nickname.toLowerCase() == "free" ? true: false;
        this.priceControl.patchValue(plan)
      });

    } else {
      this.plansList = this._api.plans;
      const plan = this.plansList.find(plan => plan.id == plan_id) || this.plansList.find(plan => plan.nickname.toLowerCase() == "free")
      this.priceControl.patchValue(plan);
     
    }


    this.priceControl.valueChanges.subscribe( plan => {
      console.log(plan);
     if (plan.nickname == "Free" && this.card) {
      this.card.unmount();
      this.isCardValid = true;

    } else if (!isNullOrUndefined(this.card)) {
      this.card.mount("#stripe-card-element");
      this.isCardValid = false;
      console.log(this.isCardValid, 'iscardValid');
      this.card.on('change', (data) => {
          this.isCardValid = data.complete && !data.errors;
      });

    }
    });
    
    
   
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

  ngAfterViewInit(): void {

  }


 
  signup() {
    if(this.priceControl.value && (<TPlan>this.priceControl.value).nickname.toLowerCase() == "free") {
      const $signup = this._api.user.signup({user: {email: this.signUpFormGroup.value.email, password: this.signUpFormGroup.value.password}}).subscribe((response: TResponse<TUser>) => {
        console.log(response);
        this._cookieService.set(environment.atto_cookie, response.data.token)
        this._router.navigate(['dashboard'])
      }, (error) => {
  
      });

      this._subsink.sink = $signup
    } else {
      this._subsink.sink =  this._stripeService.createPaymentMethod('card', this.card).subscribe((value: PaymentMethodResult) => {
        const userInfo = {email: this.signUpFormGroup.value.email, password: this.signUpFormGroup.value.password};
        const paymentInfo = {payment_method_id: value.paymentMethod.id, plan: this.priceControl.value.id};
        const $signup = this._api.user.signup({user: userInfo, payment: paymentInfo}).subscribe((response: TResponse<TUser>) => {
          console.log(response);
          this._cookieService.set(environment.atto_cookie, response.data.token)
          this._router.navigate(['dashboard'])

        }, (error) => {
    
        });

        this._subsink.sink = $signup;
      });

    }
  }

  signupWithPayment() {
    
  }
  ngOnDestroy() {

  }




}
