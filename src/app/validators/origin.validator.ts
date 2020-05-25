import { AbstractControl, Validators, ValidationErrors, FormGroupDirective, FormGroup, ControlContainer } from "@angular/forms";

export class OriginValidators {

    static originPattern(control: AbstractControl): { [key: string]: any } | null {
        console.log(control);
        if(!control.value || !control.value.whitelist || !control.value.origin_type)
            return null
        const domainReg = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        const ipReg = new RegExp('^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$');

        const originType = control.value.origin_type;
        console.log('originType', originType);
        if (originType.origin_name == 'ipv4' && control.value.whitelist) {
            console.log('inside ip reg test',  ipReg.test(control.value.whitelist));
            
            const regval = ipReg.test(control.value.whitelist) ? control.get('whitelist').setErrors(null): control.get('whitelist').setErrors({ message: 'Invalid IP' });
            // return ipReg.test(control.value.whitelist) ? null : { errors: { origin_type: 'Incorrect format for origin type ipv4' } }
            console.log('control', control)
            
            return ipReg.test(control.value.whitelist) ? null : {message: 'Invalid IP'}
        }

        //only trigger setting errors if the domain passed 
        console.log('at control value')
        domainReg.test(control.value.whitelist) && control.value.whitelist ? control.get('whitelist').setErrors(null): control.get('whitelist').setErrors({ message: 'Invalid url'});

        // return domainReg.test(control.value.whitelist) ? null : { errors: { origi type url' } }
        return domainReg.test(control.value.whitelist) ? null: {message: 'Invalid URL'}

    }

}