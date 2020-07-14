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
import { tap, switchMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import { PaymentMethodResult } from 'ngx-stripe/lib/interfaces/payment-intent';
import { SubSink } from 'subsink';
import { element } from 'protractor';
import { trigger, state, animate, style, keyframes, transition, query, animateChild, group, stagger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('animateSideBanner', [
      state('closeSideBan', style({transform: 'translateX(-100%)', opacity: 0})),
      state('openSideBan', style({transform: 'translateX(0)', opacity: 1})),

      transition('openSideBan => closeSideBan', [
       
  
            query(':self', [
              animate("180ms"),
            ],),

     
            query('@titleAnim', [
                animateChild()
            ]),

            query('@subtitleAnim', [
              animateChild(),
            ])
       

      ]),

      transition('closeSideBan => openSideBan', [
       
  
        query(':self', [
          animate("180ms"),
        ],),

 
        group([
          query('@titleAnim', [  
            animateChild()
          ]),
          
          query('@subtitleAnim', [
            animateChild(),
          ])

        ])

   

  ]),
        
  
    ]),

    

    trigger('titleAnim', [
      state('flyUp', style({transform: 'translateY(-100%)', opacity: 0})),
      state('dropDown', style({transform: 'translateY(0)', opacity: 1})),
      transition('flyUp <=> dropDown', animate('160ms')),
      transition('void => dropDown', [
        style({transform: 'translateY(-100%)', opacity: 0}),
        animate('250ms', style({transform: 'translateY(0)', opacity: 1})),
      ]),

      transition('dropDown => void', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate('250ms', style({transform: 'translateY(-100%)', opacity: 0}))
      ])
    ]),


    trigger('subtitleAnim', [
      state('flyUp', style({transform: 'translateY(0%)', opacity: 1})),
      state('dropDown', style({transform: 'translateY(100%)', opacity: 0})),
      transition('flyUp <=> dropDown', animate('160ms')),
      transition('void => flyUp', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateY(0)', opacity: 1}))
      ]),

      transition('flyUp => void', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate('250ms', style({transform: 'translateY(100%)', opacity: 0}))
      ])
    ]),

   
    
  ]
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('selectSub', { static: true }) mdcSelect: any;
  showPassword: boolean = false;
  priceControl: FormControl = new FormControl({nickname: "Free", amount: "0", currency: "usd"});
  plansList: TPlan[] = []
  elements: Elements;
  stripeFormControl: FormControl = new FormControl();
  card: StripeElement;
  isCardValid: boolean;
  isLoading: boolean = false;
  animLoad = false;
  private _subsink: SubSink = new SubSink();
  elementsOptions: ElementsOptions = {
    locale: 'en'
  }


  openSideBanner = false;
  selectedPrice = 0;
  signUpFormGroup: FormGroup;
  errorMessage: string;
  isServerError: boolean;
  constructor(private _api: ApiService,
    private _stripeService: StripeService,
    private _cookieService: CookieService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fb: FormBuilder) {

    this.signUpFormGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });

    const plan_id = this._activatedRoute.snapshot.queryParamMap.get('plan_id');
    this.isCardValid = plan_id ? false: true;
    if(this._api.plans.length == 0) {
      const $pricing = this._api.subscriptions.list_plans().subscribe((response) => {
        this.plansList = response.data;
        this.plansList = this.plansList.sort((a, b) => a.amount - b.amount);
        const plan = this.plansList.find(plan => plan.id == plan_id) || this.plansList.find(plan => plan.nickname.toLowerCase() == "free")
        this.isCardValid = plan.nickname.toLowerCase() == "free" ? true: false;
        this.priceControl.patchValue(plan)

        this._subsink.sink = $pricing;
      });

    } else {
      this.plansList = this._api.plans;
      const plan = this.plansList.find(plan => plan.id == plan_id) || this.plansList.find(plan => plan.nickname.toLowerCase() == "free")
      this.priceControl.patchValue(plan);
     
    }


    this.priceControl.valueChanges.subscribe( plan => {
     if (plan.nickname == "Free" && this.card) {
      this.card.unmount();
      this.isCardValid = true;

    } else if(!isNullOrUndefined(this.card)){
      this.card.mount("#stripe-card-element");
      this.isCardValid = false;

      this.card.on('change', (data) => {
        this.isCardValid = data.complete && !data.errors;
    });

    }
    });
    
    
   
  }


  ngOnInit(): void {
    /**
     * use a switchMap to chain observables, one after the other in order to prevent a race condition.
     */
    this._stripeService.elements(this.elementsOptions).pipe(
     switchMap((elements) => {
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

     

      return of(elements);
     }),

     switchMap((elements) => {
       const plan: TPlan = this.priceControl.value;
       if(plan.nickname.toLowerCase() == "free") {
        this.card.unmount();
        this.isCardValid = true;
=        return of(elements);
       } 

       this.card.mount("#stripe-card-element");
       this.isCardValid = false;
 
       this.card.on('change', (data) => {
         this.isCardValid = data.complete && !data.errors;
       })

       this.card.on('ready', (val) => {
       })


       return of(elements);
     })
    ).subscribe();


  }

  ngAfterViewInit(): void {
   
    this.openSideBanner = true;
    this._changeDetectorRef.detectChanges();

  }


   resetFormError(): void {
    this.isServerError = false;

  }


 
  signup() {
    this.isLoading = true;
    if(this.priceControl.value && (<TPlan>this.priceControl.value).nickname.toLowerCase() == "free") {

      const $signup = this._api.user.signup({user: {email: this.signUpFormGroup.value.email, password: this.signUpFormGroup.value.password}, payments: {plan: (<TPlan>this.priceControl.value).id}}).subscribe((response: TResponse<TUser>) => {
        this.isLoading = false;
        this._cookieService.set(environment.atto_cookie, response.data.token)
        this._router.navigate(['dashboard'])
      }, (message: HttpErrorResponse) => {
        this.isLoading = false;
        switch(message.status) {
          case 0: {
            this.errorMessage = "The server returned no response. The server may be down, or is experiencing too much traffic. Please try again later."

            this.isServerError = true;
            break;
          }

          case 500: {
            this.errorMessage = "An internal server error has occured. The server may have crashed or is unable to process your request." 
            this.isServerError = true;
            break;
          }
        
          case 422: {
            if(message.error.errors['email']) {
              this.signUpFormGroup.get('email').setErrors({emailExists: true})
            }
            break;
          }

          default: {
            this.errorMessage = null;
            this.isServerError = true;
          }
          
            
        }

      });

      this._subsink.sink = $signup
    } else {
      this._subsink.sink =  this._stripeService.createPaymentMethod('card', this.card).subscribe((value: PaymentMethodResult) => {
        const userInfo = {email: this.signUpFormGroup.value.email, password: this.signUpFormGroup.value.password};
        const paymentInfo = {payment_method_id: value.paymentMethod.id, plan: this.priceControl.value.id};
        const $signup = this._api.user.signup({user: userInfo, payment: paymentInfo}).subscribe((response: TResponse<TUser>) => {
          this.isLoading = false;
          this._cookieService.set(environment.atto_cookie, response.data.token);
          this._router.navigate(['dashboard']);

        }, (error: HttpErrorResponse) => {
          this.isLoading = false;
          // this.signUpFormGroup.setErrors({unknown_error: true})
        });

        this._subsink.sink = $signup;
      });



    }
  }


  get email() {
   return !isNullOrUndefined(this.signUpFormGroup.get('email').errors);
  }


  get emailError() {
    const emailErrors = this.signUpFormGroup.get('email').errors;
    if(emailErrors && emailErrors.emailExists) {
      return 'This email already exists. '
    }

    if(emailErrors && emailErrors.email) {
      return 'This is an invalid email format';
    }
    return 'This field is required';
  }
 
  ngOnDestroy() {
    this._subsink.unsubscribe();
  }




}
