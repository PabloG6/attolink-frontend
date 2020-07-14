import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TRoutes, TGenericModal } from '../models';
import { MdcDialog } from '@angular-mdc/web';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageRoutes = [

    {
      endpoint: "documentation",
      icon: "library_books",
      label: "Documentation",
    },

    {
      endpoint: "keys",
      icon: "enhanced_encryption",
      label: "Api Keys",

    },

    {
      endpoint: "whitelisted",
      icon: "settings_input_antenna",
      label: "Whitelisted Origins"
    },
  ]

  loginRoutes: TRoutes[] = [
    {
      endpoint: 'modify-plan',
      icon: 'monetization_on',
      label: 'Modify Plan',
    },

    {
      endpoint: 'account',
      icon: 'settings',
      label: 'Account',
    },


  ]
  constructor(private _router: Router, private _dialog: MatDialog, private _cookieService: CookieService) { 

  }

  get url() {
    return this._router.url;
  }
  ngOnInit(): void {
    
  }

  onMenuSelect($event): void {
    ($event);
  }

  navigate(route) {

  }

  logout() {
    const logoutGenericData: TGenericModal = {
      onConfirmCallback: () => {
        this._cookieService.deleteAll();
        this._router.navigate(['']);

      },
      cancelText: "Cancel",
      confirmText: "Logout",
      closeOnSuccess: true,
      headline: "Are you sure you'd like to log out",
      icon: "exit_to_app",
      tagline: "You'd be sent back to the home page"
    }
    const loginDialog = this._dialog.open(GenericModalComponent, { data: logoutGenericData, width: '360px', autoFocus: false, disableClose: true })
    
  }
}
