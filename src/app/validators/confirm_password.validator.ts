import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class PasswordValidator {
    static confirm_password(abstract: FormGroup): ValidationErrors {
        if (abstract.value.newPassword !== abstract.value.confirmPassword && abstract.controls.confirmPassword && abstract.controls.confirmPassword.dirty) {
           
            return {repeatPassword: true};
        }
       return null;
    }

}

