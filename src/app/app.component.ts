import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Local Night Life Meetup';
  subTitle = 'Let everyone know where you are going tonight';
  location: Location = {
    id: 1,
    name: 'titled kilt',
    address: '123 somewhere'
  }
}

export class Location {
  id: number;
  name: string;
  address: string;
}