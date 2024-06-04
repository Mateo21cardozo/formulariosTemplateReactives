import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}
  existeUsuario(
    control: FormControl
  ): Promise<ErrorValidate | null> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null); //
        }
      }, 2400);
    });
  }

  async noCardozo(
    control: FormControl
  ): Promise<{ [s: string]: boolean } | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value && control.value?.toLowerCase() === 'cardozo') {
          resolve({ noCardozo: true });
        } else {
          resolve(null);
        }
      }, 0);
    });
  }
  passwordsIguales(password1Name: string, password2Name: string) {
    return (formGroup: FormGroup) => {
      const password1Control = formGroup.controls[password1Name];
      const password2Control = formGroup.controls[password2Name];
      if (password1Control.value === password2Control.value) {
        password2Control.setErrors(null);
      } else {
        password2Control.setErrors({ noEsigual: true });
      }
    };
  }
}
