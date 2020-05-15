import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { TWhiteList } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MdcSelect, MdcSelectChange } from '@angular-mdc/web';
import { OriginValidators } from '../validators/origin.validator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.scss']
})
export class WhitelistComponent implements OnInit {
  $whitelist: Observable<any>
  displayedColumns: string[] = ["date created", "keys"]
  loadingImage: boolean;
  @ViewChild('originSelect', {static: true}) originSelect: MdcSelect;
  originTypes = [
    {origin_name: "ipv4", origin_type: "ipv4", placeholder: "Enter your ipv4 address"},
    {origin_name: "url", origin_type: "url" , placeholder: "Enter your domain name"}
  ]
  whitelistFormGroup: FormGroup;
  private _placeholder: string;
  constructor(private _api: ApiService, private _matDialog: MatDialog, private _fb: FormBuilder) { 
    this.whitelistFormGroup = _fb.group({
      whitelist: ['', [Validators.required],],
      origin_type: ['url', [Validators.required,]],
    }, {validators: OriginValidators.originPattern});

    
  }


  set placeholder(p: string) {
    this._placeholder = p;
  }
  get placeholder() {
    return this._placeholder || "Enter your domain or ip address";
  }
  ngOnInit(): void {
    this.$whitelist = this._api.whitelist.list();
    this._api.whitelist.list().subscribe((res) => {
      console.log(res);
    });

  }

  create() {
    this.loadingImage = true;
    this._api.whitelist.create(this.whitelistFormGroup.value.whitelist, this.whitelistFormGroup.value.origin_type.origin_name).subscribe(_ => {
      console.log("hello world");
      this.$whitelist = this._api.whitelist.list()
      this.whitelistFormGroup.reset();
      this.whitelistFormGroup.clearValidators();

    }, (response: HttpErrorResponse) => {
        console.log(response.error);
        const error = response.error;
        if(error['errors']['ip_address'] && this.whitelistFormGroup.get('origin_type').value == 'ipv4') {
          this.whitelistFormGroup.get('whitelist').setErrors({whitelist: "This IP address has already been registered. "})
          return;
        }

        if(error['errors']['ip_address']) {
          this.whitelistFormGroup.get('whitelist').setErrors({whitelist: "This url has already already registered. "})
          return;
        }

        console.log('whiteListFormGroup:', this.whitelistFormGroup.errors);
        console.log(`error:`, error)
    });
  }


  delete(whitelist: TWhiteList): void {
    this._matDialog.open(DeleteModalComponent, {data: whitelist, width: '360px', autoFocus: false, disableClose: true}).afterClosed().subscribe(val => {
      if(val.success) {
        this.$whitelist = this._api.whitelist.list();
      }
    });
  }


  get validationMessage() {
    return this.whitelistFormGroup.get('whitelist').errors.ip_address || "This format is incorrect. " || null;
  }

  

  updateRules() {

  }
  onSelectionChange($event: MdcSelectChange): void {
    this.placeholder = $event.value.placeholder;
    
  }



  

}



