import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { User } from './user';
// fonction pour une validation manuelle
function ratingRangeValidator(min:number , max:number) {

return(c:AbstractControl) : {[key:string] : boolean } | null  =>{
  if (c.value != null && (isNaN(c.value) || c.value < min || c.value > max)) { // '!!' ni null ni undefined
      return {'rangeErreur' : true}
  }
  return null ;
};
}
// fonction pour valider deux champ 'email'

function emailMatcher(c:AbstractControl):{[key:string] : boolean} | null {
  const emailControl = c.get('email')
  const emailConfirmControl = c.get('confirmEmail')
if (emailControl?.pristine || emailConfirmControl?.pristine) {
return null;
}
if (emailControl?.value === emailConfirmControl?.value) {
  return null;
}
return {'match' : true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: User = new User();

  public registerForm!: FormGroup; // donnee un nom au formulaire

  public errorMsg!: string ;

  private validationErrorMrssages = {
    required:'Entrez votre E-mail',
    email:'Entrez un E-mail valide'
  }

  constructor(private formBuilder: FormBuilder) {} // injecter FormBuilder qui permet de faciliter le travail de validation

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]], // {value:'indisponible' , disabled: true}

      emailGroup: this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            confirmEmail: ['', [Validators.required , Validators.email]],
            } , {validators: emailMatcher}),

      phone: ['', [Validators.required, Validators.minLength(4)]],
      rating:[null , ratingRangeValidator(1,5)],
      notification: 'email',
      sendCatalog: true,

      addresses: this.formBuilder.array([this.createAddressGroup()])
    });
      // recuperer les changements sans la methode (click) ==> niveau HTML
    this.registerForm.get('notification')?.valueChanges.subscribe(value =>{
      this.setNotificationSitting(value)
    });

    const emailControl = this.registerForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(debounceTime(2000)).subscribe( valeur =>{
      console.log(valeur);
      this.setMessage(emailControl)
    })
  }

  //methode pour restructurer pour pouvoir dupliquer
  private createAddressGroup(): FormGroup{
    return this.formBuilder.group({
      addressType:['home'],
      street1:[''],
      street2:[''],
      city:[''],
      state:[''],
      zip:[''],
  })
  }
  //
  public addAddress(): void
{
  this.addressList.push(this.createAddressGroup)
}  //
  public get addressList(): FormArray{
    return<FormArray> this.registerForm.get('addresses')
  }
//
  saveData() {
    console.log(this.registerForm);
    console.log('les valeurs', JSON.stringify(this.registerForm?.value));
  }
  //
  fillFormData() {
    this.registerForm.setValue({
      firstName: 'Fred',
      lastName: 'Monique',
      email: 'fred@yahoo.fr',
      sendCatalog: true,
    });
  }
  public setNotificationSitting(method: string): void {
    // method : text ou email
    const phoneControl = this.registerForm.get('phone');
    if (method === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
  private setMessage(valeur: AbstractControl) : void{
      this.errorMsg = '';
      if ((valeur.touched || valeur.dirty) && valeur.errors) {
        this.errorMsg = Object.keys(valeur.errors).map(
          (key) => this.validationErrorMrssages[key as 'required']).join(' ');
      }
      console.log(this.errorMsg);
  }

}
