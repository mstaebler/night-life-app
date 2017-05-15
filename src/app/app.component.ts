import { Component, OnInit } from '@angular/core';
import { YelpService } from './yelp.service';
import { UserService } from './user.service';

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
  loggedIn = false;

  constructor( private YelpService: YelpService, private UserService: UserService) {}

  ngOnInit() {
    if(localStorage.hasOwnProperty('zipcode')){
      this.zipcode = localStorage.getItem("zipcode");
      if(this.zipcode !== "")
        this.getLocation();
    } else {
      this.zipcode = '';
    }
    this.loggedInCheck()
  }

  loggedInCheck(){
    console.log(this.UserService.logInCheck())
  }
  click(event, id) {
    event.preventDefault();
    console.log(id);
    this.UserService.getPatrons(id)
      .subscribe(
        patrons => {          
          console.log(patrons)},
        error => this.errorMessage = <any>error);
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