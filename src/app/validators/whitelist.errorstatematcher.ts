import { ErrorStateMatcher } from '@angular-mdc/web';

export class WhiteListErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: import("@angular/forms").FormControl, form: import("@angular/forms").FormGroupDirective | import("@angular/forms").NgForm): boolean {
        return (control.dirty && form.submitted);
        
    }

}