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

  ngOnInit() {  }

  getLocation() {
    this.YelpService.getLocation(this.zipcode)
      .subscribe(
        location => {          
          this.location = location
          console.log('location', this.location)}
          ,
        error => this.errorMessage = <any>error);
  }
  

  onKey(event: any) {
    this.zipcode = event.target.value;
    console.log(this.location);
  }

  onSubmit() {
    this.submitted = true;
    if(this.zipcode.length === 5 && !isNaN(+this.zipcode))
      this.getLocation();
  }
}