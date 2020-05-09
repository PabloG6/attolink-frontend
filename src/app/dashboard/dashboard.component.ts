import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private _router: Router) { }

  get url() {
    return this._router.url;
  }
  ngOnInit(): void {
    console.log()
  }

}
