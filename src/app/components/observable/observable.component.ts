import { Component, OnInit } from '@angular/core';
import { interval, Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {

    public  observable = Observable.create((source:Observer<any>) =>{
      source.next(Math.random()*10) // 0==>1
     })

    public observable2 = new Observable(this.subFunction)

    public subject = new Subject();

  constructor() {}
  ngOnInit(): void {
  }

 public subFunction(observer: any){
    const value = Math.random()*10;

    if (value < 5) {
      observer.next(value +' min')}

    else if(value > 5) {
      observer.next(value +' max')
    } else{
        observer.error('value est undefind')
    }
    observer.complete();
 }

  start(){
    //premiere Methodes
  this.observable.subscribe((v: any) => console.log('consumer A: ' + v));
   this.observable.subscribe((v: any) => console.log('consumer B: ' + v));
// deuxiemes methodes
   this.observable2.subscribe(this.nextFunc,this.errorFunct,this.completeFunct);
// method subject
   this.subject.subscribe(v => console.log('consumerSubject A' + v));
   this.subject.subscribe(v => console.log('consumerSubject B' + v));
   this.observable.subscribe(this.subject);
  }
    nextFunc(value: any){
        console.log('got value: ' + value);

    }
    errorFunct(error: string){
      console.warn("caught error " + error);
    }
    completeFunct(){
        console.log("completed function");
    }
     stop(){
        this.observable.unsubscribe();
      }


  }

