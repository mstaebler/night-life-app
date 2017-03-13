import { Component, OnInit } from '@angular/core';
import { YelpService } from './yelp.service';

import { Location } from './location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Can't decide where to go tonight?";
  subTitle = "Enter your zipcode to get started";
  submitted = false;
  zipcode = "";
  errorMessage: string;
  location: Location[];
  mode = 'Observable';

  constructor( private YelpService: YelpService) {}

  ngOnInit() { this.getLocation(); }

  getLocation() {
    this.YelpService.getLocation()
      .subscribe(
        location => this.location = location,
        error => this.errorMessage = <any>error);
  }
  

  onKey(event: any) {
    this.zipcode = event.target.value;
    console.log(this.location);
  }

  onSubmit() {
    this.submitted = true;
  }
}