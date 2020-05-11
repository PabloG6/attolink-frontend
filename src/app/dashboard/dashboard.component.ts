import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TRoutes } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  routes = [

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

    {
      endpoint: "settings",
      icon: "settings",
      label: "Settings",
    },


  ]

  loginRoutes: TRoutes[] = [
    {
      endpoint: '/plans',
      icon: 'monetization_on',
      label: 'Upgrade your Plan',
    },

    {
      endpoint: '/account',
      icon: 'settings',
      label: 'Settings',
    },
    {
      endpoint: '/',
      icon: 'exit_to_app',
      label: 'Logout',
    },
 


  ]
  constructor(private _router: Router) { }

  get url() {
    return this._router.url;
  }
  ngOnInit(): void {
    console.log()
  }

  onMenuSelect($event): void {
    console.log($event);
  }

  navigate(route) {

  }
}
