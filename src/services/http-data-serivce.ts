import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Filter, IDataProvider, LocalDataProvider } from '@ksaleh/dropdown-lookup';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class HttpDataService extends LocalDataProvider{
    constructor(private http:HttpClient) { 
        super({pageSize:null,data:null});
    }
    
    filterStr;
    applyFilter(){
        let f:Filter = this.filter()  ;
        this.filterStr = `&${f.field}=${f.value}` ;
        this.pageIndex=0;
      }
    
    getPage = (i:number) => {

        this.fetch(i)        
        .pipe(take(1)).subscribe(
            (result :any )=>{
              this.total =   result.meta.pagination.total;
              this.pageSize = result.meta.pagination.limit;
              this.pageCount =   result.meta.pagination.pages;
              this.data = result.data;
              this.subject.next(this.data);
        });

        return this.subject.asObservable();
    } 
    fetch(page:number) :Observable<any>{
        const URL = `https://gorest.co.in/public-api/users?page=${page+1}${this.filterStr}`;
        return this.http.get(URL);
    }
}