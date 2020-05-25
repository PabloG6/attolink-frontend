import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SubSink } from 'subsink';
import { TResponseList, TPlan } from '../models';

@Component({
  selector: 'app-change-payment',
  templateUrl: './change-payment.component.html',
  styleUrls: ['./change-payment.component.scss']
})
export class ChangePaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  private _subsink: SubSink = new SubSink();
  loading = false;
  constructor(private _api: ApiService) { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loading = true;
    this._subsink.sink = this._api.subscriptions.list_plans().subscribe((response: TResponseList<TPlan>) => {
      this.loading = false
      
    }, () => {

    })
  }

  ngOnDestroy(): void {
    this._subsink.unsubscribe();
  }


}
