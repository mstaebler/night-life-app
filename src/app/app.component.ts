import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Can't decide where to go tonight?";
  subTitle = "Enter your zipcode to get started";
  submitted = false;
  zipcode = "";

  onKey(event: any) {
    this.zipcode = event.target.value;
  }

  onSubmit() {
    this.submitted = true;
  }
}