import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';

import { YelpService } from './yelp.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [YelpService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
