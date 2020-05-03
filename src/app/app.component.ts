import { Component } from '@angular/core';
import { ApiService } from './api/api.service';
import { MdcDialog } from '@angular-mdc/web';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'attolink';

  constructor(private _dialog: MdcDialog, private _router: Router) {

  }
  public signup() {
    
  }

 
}
