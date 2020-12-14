import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DropdownLookupModule} from '@ksaleh/dropdown-lookup';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import "@angular/compiler";
import {enableProdMode} from '@angular/core';

enableProdMode();
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DropdownLookupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//"@ksaleh/dropdown-lookup": "file:../../ksaleh-ng-works/dist/ksaleh-ng/dropdown-lookup",
//"@ksaleh/dropdown-lookup": "0.0.6",