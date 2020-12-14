import { InjectionToken } from '@angular/core';
import { Component } from '@angular/core';
import { Configurations,LocalDataProvider,DataProviderServiceConfig,PREDICATES, IDataProvider } from '@ksaleh/dropdown-lookup';
import {take} from 'rxjs/operators';
import { HttpDataService } from './../services/http-data-serivce';


const random = (n=10)=> Math.floor(Math.random() * n);
const names = ["Peter","Alan" , "Ali","Joe","Jason","Mason","Jack","Barry","Franki","Hunter"];
const days = [3,7,10,11,14,17,20,21,25,28];
const monthes = [1,2,3,5,6,7,8,10,11,12];
const years = [1970,1982,1978,1987,1990,1995,2000,1984,2002,1998];
const jobs = ['Testing Engineer','Devops Engineer ','Frontend Developer','Backend Developer',"Fullstack Developer",'Aystem Architect','Project Manager']
let data :any[] =[];
(()=>{
   for(let i =0;i<300;i++)  {
      let name = `${names[random()]} ${names[random()]} ${names[random()]} ${names[random()]}`;
      let date = `${monthes[random()]}/${days[random()]}/${years[random()]}`;
      let job = `${jobs[random(7)]}`;
      data.push({id:i,name:name,job:job,birthdate:date,project:`Project_#${i}`});
   }  
})();


const  LocalDataProviderToken = new InjectionToken<IDataProvider>('LocalDataProviderToken'); 
const  ServerDataProviderToken = new InjectionToken<IDataProvider>('ServerDataProviderToken'); 
const  LocalDataProviderToken2 = new InjectionToken<IDataProvider>('LocalDataProviderToken2'); 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[
      {provide: LocalDataProviderToken ,useClass : LocalDataProvider},
      {provide: ServerDataProviderToken ,useClass : HttpDataService},
      {provide: LocalDataProviderToken2 ,useClass : LocalDataProvider},
      ]
    
})
export class AppComponent {
  title = 'dropdown-lookup-demo';
  
  localConfigurations : Configurations;
  webApiConfigurations : Configurations;
  localConfigurations2 : Configurations;

  constructor(){
  this.localConfigurations = new Configurations();
  this.localConfigurations.use = LocalDataProviderToken;
  this.localConfigurations.dataConfig =   new DataProviderServiceConfig (10,data);
  this.localConfigurations.columns =   [
    {field:'id',title:'ID',name:'ID',width:80},
    {field:'name',title:'Name',name:'Name',width:170},
    {field:'job',title:'Job',name:'Job',width:180},
    {field:'birthdate',title:'Date Of Birth',name:'Birth',width:100},
    {field:'project',title:'Project',name:'Project',width:75}
  ] ;
  this.localConfigurations.filter = {field:'name',predicate:PREDICATES.CONTAINS,value:null,ignoreCase:true};
  this.localConfigurations.lookupField=()=> 'name';
  this.localConfigurations.onSelect = (obs)=>{
    obs.pipe(take(1)).subscribe(data=> { 
      console.log(data);
      alert(`User selected : ${data.id},${data.name},${data.birthdate},${data.job}`);
    });
  }



  this.webApiConfigurations = new Configurations();
  this.webApiConfigurations.use = ServerDataProviderToken;
  this.webApiConfigurations.dataConfig = new DataProviderServiceConfig (10,'https://gorest.co.in/public-api/users');
  this.webApiConfigurations.columns =   [
    
    {field:'id',title:'ID',name:'ID',width:80},
    {field:'name',title:'Name',name:'Name',width:200},
    {field:'email',title:'E.Mail',name:'email',width:250},
    {field:'gender',title:'Gender',name:'gender',width:80},
    {field:'status',title:'Status',name:'status',width:100},

    ] ;
    this.webApiConfigurations.filter = {field:'name',predicate:PREDICATES.CONTAINS,value:null,ignoreCase:true};
    this.webApiConfigurations.lookupField=()=> 'name';
    this.webApiConfigurations.onSelect = (obs)=>{
      obs.pipe(take(1)).subscribe(data=> { 
        console.log(data);
        alert(`User selected : ${data.id},${data.name},${data.birthdate},${data.job}`);
      });
    }

  
    this.localConfigurations2 = new Configurations();
    this.localConfigurations2.inputDelay = 150;
    this.localConfigurations2.use = LocalDataProviderToken2;
    this.localConfigurations2.dataConfig =   new DataProviderServiceConfig (5,data);
    this.localConfigurations2.columns =   [
      {field:'id',title:'ID',name:'ID',width:80},
      {field:'name',title:'Name',name:'Name',width:170},
      {field:'job',title:'Job',name:'Job',width:180},
      {field:'birthdate',title:'Date Of Birth',name:'Birth',width:100},
      {field:'project',title:'Project',name:'Project',width:75}
    ] ;
    this.localConfigurations2.filter = {field:'name',predicate:PREDICATES.CONTAINS,value:null,ignoreCase:true};
    this.localConfigurations2.lookupField=()=> 'name';
    this.localConfigurations2.onSelect = (obs)=>{
      obs.pipe(take(1)).subscribe(data=> { 
        console.log(data);
        alert(`User selected : ${data.id},${data.name},${data.birthdate},${data.job}`);
      });
    }
  
  
    
  }


}
