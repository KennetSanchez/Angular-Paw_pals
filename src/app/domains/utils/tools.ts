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



