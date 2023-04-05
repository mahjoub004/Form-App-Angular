import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ObservableComponent } from './components/observable/observable.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'observable' , component: ObservableComponent},
  {path:'formulaire' , component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
