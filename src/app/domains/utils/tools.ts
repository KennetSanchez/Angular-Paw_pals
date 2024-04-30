import { FormGroup } from "@angular/forms";

export function delayOnPurpose<T>(objectToReturn: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(objectToReturn);
      }, 2000); // Delay for 2 seconds
    });
}

export function setFormValue(inputName: string, value: string, form : FormGroup){
  form.get(inputName)?.setValue(value);
}

export function getFormValue(inputName: string, form: FormGroup) : string{
  return form.get(inputName)?.value;
}

export function aReallyCoolAndActualHash(password: string){
  return 'hashMeThis' + password + 'sihTeMhsah';
}


