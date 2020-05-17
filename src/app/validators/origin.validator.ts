import { AbstractControl, Validators, ValidationErrors, FormGroupDirective, FormGroup, ControlContainer } from "@angular/forms";

export class OriginValidators {

    static originPattern(control: AbstractControl): { [key: string]: any } | null {
        console.log(control);
        if(!control.value || !control.value.whitelist || !control.value.origin_type)
            return null
        const domainReg = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        const ipReg = new RegExp('^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$')

        const originType = control.value.origin_type;
        console.log('originType', originType);
        if (originType.origin_name == 'ipv4' && control.value.whitelist) {
            console.log('!ipReg.test(control.value.whitelist) && control.value.whitelist',  !ipReg.test(control.value.whitelist) && control.value.whitelist)
            !ipReg.test(control.value.whitelist) && !(control.value.whitelist == '' || control.value.whitelist == undefined )? control.get('whitelist').setErrors({ message: 'Invalid IP' }): null;
            return ipReg.test(control.value.whitelist) ? null : { errors: { origin_type: 'Incorrect format for origin type ipv4' } }
        }

        //only trigger setting errors if the domain passed 

        !domainReg.test(control.value.whitelist) && control.value.whitelist ? control.get('whitelist').setErrors({ message: 'Invalid url' }) : null;

        return domainReg.test(control.value.whitelist) ? null : { errors: { origin_type: 'Incorrect format for origin type url' } }


    }

}