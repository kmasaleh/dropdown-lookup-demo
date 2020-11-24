import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DropdownLookupModule} from '@ksaleh-ng/dropdown-lookup';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownLookupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
