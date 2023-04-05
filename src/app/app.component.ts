import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   title = 'Form-App-Angular';

  ngOnInit(): void {
  }

}
