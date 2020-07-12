import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  id: string;

  constructor(private _api: ApiService, 
    private _activatedRoute: ActivatedRoute, 
    private _cookieservice: CookieService,
    private _router: Router) {
    this.id = _activatedRoute.snapshot.paramMap.get('id');
    this._api.email.confirm_update_email(this.id).subscribe((response: HttpResponse<any>) => {
      const token = response.body.token;
      _cookieservice.set(environment.atto_cookie, token);
    }, () => {})   
  }

  ngOnInit(): void {
  }

  goToDashboard() {
    this._router.navigate(['dashboard']);

  }

}
