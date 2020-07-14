import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-password-reset',
  templateUrl: './send-password-reset.component.html',
  styleUrls: ['./send-password-reset.component.scss']
})
export class SendPasswordResetComponent implements OnInit {

  formControl: FormControl;
  constructor(private _api: ApiService, private _router: Router) { 
    this.formControl = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
  }

  confirm() {
    this._api.password.create({password: {email: this.formControl.value}}).subscribe(() => {
      this._router.navigate(['email_sent'])
    }, () => {

    } )
  
  }

}
