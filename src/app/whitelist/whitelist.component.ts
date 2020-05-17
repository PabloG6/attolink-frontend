import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { TWhiteList } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FormBuilder, Validators, FormGroup, AbstractControl, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import { MdcSelect, MdcSelectChange } from '@angular-mdc/web';
import { OriginValidators } from '../validators/origin.validator';
import { HttpErrorResponse } from '@angular/common/http';
import {SubSink} from 'subsink';
import { WhiteListErrorStateMatcher } from '../validators/whitelist.errorstatematcher';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.scss']
})
export class WhitelistComponent implements OnInit, OnDestroy {
  
  $whitelist: Observable<any>
  private _subs = new SubSink();
  displayedColumns: string[] = ["date created", "keys"]
  loadingImage: boolean;
  @ViewChild('originSelect', {static: true}) originSelect: MdcSelect;
  originTypes = [
    {origin_name: "ipv4", origin_type: "ipv4", placeholder: "Enter your ipv4 address"},
    {origin_name: "url", origin_type: "url" , placeholder: "Enter your domain name"}
  ]
  whitelistFormGroup: FormGroup;
  whiteListMatcher = new WhiteListErrorStateMatcher();
  restrictedControl: FormControl = new FormControl('all');
  private _placeholder: string;
  constructor(private _api: ApiService, private _matDialog: MatDialog, private _fb: FormBuilder) { 
    this.whitelistFormGroup = _fb.group({
      whitelist: ['', [],],
      origin_type: [this.originTypes[1], [Validators.required,]],
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
    });
    this._subs.sink = this.$whitelist.subscribe(() => {

    })
  }

  create(menuForm: FormGroupDirective) {
    this.loadingImage = true;
    this._api.whitelist.create(this.whitelistFormGroup.value.whitelist, this.whitelistFormGroup.value.origin_type.origin_name).subscribe(_ => {
      this.$whitelist = this._api.whitelist.list()
      menuForm.resetForm();
      menuForm.reset();
      this.whitelistFormGroup.get('whitelist').setErrors(null);
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

    });
  }


 


  get validationMessage() {
    console.log(this.whitelistFormGroup.get('whitelist').errors);
    return this.whitelistFormGroup.get('whitelist').errors ? this.whitelistFormGroup.get('whitelist').errors.message: null;
  }

  


  onSelectionChange($event: MdcSelectChange): void {
    this.placeholder = $event.value.placeholder;
    
  }

  onRestrictSelectionChange($event: MdcSelectChange): void {

  }


  delete(whitelist: TWhiteList) {
  
    const $delete = this._api.whitelist.delete(whitelist.id);
    const dialogRef = this._matDialog.open(DeleteModalComponent, {data: {observable: $delete}, autoFocus: false, disableClose: true, width: '360px'});
    dialogRef.afterClosed().subscribe((info) => {
      if(info.success) {
        
        this.$whitelist = this._api.whitelist.list();
      }
    })
  }
  ngOnDestroy():void {
    this._subs.unsubscribe();
  }


  

}



