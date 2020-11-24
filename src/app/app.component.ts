import { Component } from '@angular/core';
import { Configurations, dataProviderConfgToken, DataProviderServiceToken, LocalDataProvider, LocalDataProviderConfig, PREDICATES } from '@ksaleh-ng/dropdown-lookup';
import {take} from 'rxjs/operators';

let data :any[] =[];
(()=>{
   for(let i =0;i<51;i++)
      data.push({id:i,name:'khaled saleh',job:'software engineer',birthdate:'08/20/1965',project:'front end'});
      for(let i =51;i<100;i++)
      data.push({id:i,name:'waleed saleh',job:'software engineer',birthdate:'08/20/1965',project:'front end'});

})();

const localDataConfg:LocalDataProviderConfig = {
  data : data,
  pageSize :7
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[
        {provide: dataProviderConfgToken ,useValue :localDataConfg },
        {provide: DataProviderServiceToken ,useClass : LocalDataProvider},
      //  {provide: DataProviderServiceToken ,useClass : HttpDataService},
      ]
    
})
export class AppComponent {
  title = 'dropdown-lookup-demo';
  configurations : Configurations;
  constructor(){
  this.configurations = new Configurations();
  this.configurations.columns = 
/*  
  [
    {field:'id',title:'ID',name:'ID',width:80},
    {field:'name',title:'Name',name:'Name',width:200},
    {field:'email',title:'E.Mail',name:'email',width:250},
    {field:'gender',title:'Gender',name:'gender',width:80},
    {field:'status',title:'Status',name:'status',width:100},
  ] ;
*/
      
  [
      {field:'id',title:'ID',name:'ID',width:80},
      {field:'name',title:'Name',name:'Name',width:170},
      {field:'job',title:'Job',name:'Job',width:180},
      {field:'birthdate',title:'Date Of Birth',name:'Birth',width:100},
      {field:'project',title:'Project',name:'Project',width:75}
    ] ;
  
    this.configurations.filter = {field:'id',predicate:PREDICATES.GTE,value:null};
    this.configurations.lookupField=()=> 'name';
    this.configurations.onSelect = (obs)=>{
      obs.pipe(take(1)).subscribe(data=> console.log(data));
    }
 
  }


}
