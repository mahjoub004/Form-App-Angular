import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   public user: User = new User();

   public registerForm!: FormGroup;
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      lastName:[''],
      firstName: {value:'indisponible' , disabled: true},
      email: '',
      sendCatalog:false,
    });
  }

saveData(){
  console.log( this.registerForm);
  console.log( 'les valeurs' ,JSON.stringify(this.registerForm?.value) );
}
fillFormData(){
  this.registerForm.setValue({
    firstName:'Fred',
    lastName:'Monique',
    email:'fred@yahoo.fr',
    sendCatalog: true,
  })
}
}
