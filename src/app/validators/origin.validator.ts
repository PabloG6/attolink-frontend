import { AbstractControl, Validators, ValidationErrors, FormGroupDirective, FormGroup } from "@angular/forms";

export class OriginValidators {
   
         static originPattern(control: AbstractControl): {[key: string]: any} | null {
            console.log(control);
            const domainReg = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
            const ipReg = new RegExp('^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$')
          
            const originType = control.value.origin_type;
            console.log(`ipv4: ${ipReg.test(control.value.whitelist)}`)
            console.log(`url: ${domainReg.test(control.value.whitelist)}`)
            if(originType.origin_name == 'ipv4') {
                return ipReg.test(control.value.whitelist) ? null : {errors: {origin_type: 'Incorrect format for origin type'}}
            }

            return domainReg.test(control.value.whitelist) ?  null : {errors: {origin_type: 'Incorrect format for origin type'}}
             
        }
    
}