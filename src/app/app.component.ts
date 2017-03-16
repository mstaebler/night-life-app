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
  zipcode: string;
  errorMessage: string;
  location: Location[];
  mode = 'Observable';
  going = 0;

  constructor( private YelpService: YelpService) {}

  ngOnInit() {
    if(localStorage.hasOwnProperty('zipcode')){
      this.zipcode = localStorage.getItem("zipcode");
      if(this.zipcode !== "")
        this.getLocation();
    } else {
      this.zipcode = '';
    } 
   }

  getLocation() {
    localStorage.setItem("zipcode", this.zipcode);
    console.log(localStorage);
    this.YelpService.getLocation(this.zipcode)
      .subscribe(
        location => {          
          this.location = location},
        error => this.errorMessage = <any>error);
  }
  

  onKey(event: any) {
    this.zipcode = event.target.value;
  }

  onSubmit() {
    this.submitted = true;
    if(this.zipcode.length === 5 && !isNaN(+this.zipcode))
      this.getLocation();
  }
}