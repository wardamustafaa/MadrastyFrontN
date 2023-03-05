import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import  dayGridPlugin from '@fullcalendar/daygrid';
import  timeGridPlugin  from '@fullcalendar/timegrid';
import  interactionPlugin  from '@fullcalendar/daygrid';
import  listPlugin  from '@fullcalendar/list';
import { LayoutService } from './layout/services/layout.service';
import { LoaderService } from './layout/services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MadrastyUI';
  isConsidered = false;
  fos7aTime = '10:30:00 AM';
  count = 0;
  interval = 45;
  fos7aDuration = 30;
  fos7aStartTime = new Date();
 public deps : any[] = [];
 calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin,listPlugin],
  initialView: 'timeGridDay',
  headerToolbar:{
    right:'dayGridMonth,timeGridDay,listWeek'
  },
  weekends: true,
  slotDuration :'00:45',
  slotLabelInterval: '00:45',
  slotMinTime:'09:00',
  slotMaxTime: '14:00',
  slotLabelContent: (arg) => {
    let html = ``;
    var start = arg.date;
    var end = new Date(`1970-01-01 ${this.fos7aTime}`);
    if(start.toLocaleTimeString() == end.toLocaleTimeString()){
      this.isConsidered = true;
    }

    if(!this.isConsidered){
      html = `<div style="height:80px;">${arg.date.toLocaleTimeString()}</div>`;
    }else{
      if(this.count == 0){
        this.fos7aStartTime = end;
        this.fos7aStartTime = new Date(this.fos7aStartTime.getTime() + this.interval*this.count*60000);
      }else if(this.count == 1){
        this.fos7aStartTime = new Date(this.fos7aStartTime.getTime() + this.fos7aDuration*60000);
      }else{
        this.fos7aStartTime = new Date(this.fos7aStartTime.getTime() + this.interval*60000);
      }
      html = `<div style="height:80px;">${this.fos7aStartTime.toLocaleTimeString()}</div>`;
      this.count++;
    }

    return {
      html,
    };
  },
  events: [
    { title: 'Meeting', start: '2023-02-11T09:00:00.000', end: '2023-02-11T09:45:00.000' },
    { title: 'Meeting12', start: '2023-02-11T09:00:00.000', end: '2023-02-11T09:45:00.000' },
    { title: 'Meeting13', start: '2023-02-11T09:00:00.000', end: '2023-02-11T09:45:00.000' },
    { title: 'Meeting2', start: '2023-02-11T09:45:00.000', end: '2023-02-11T10:30:00.000' },
    { title: 'Meeting3', start: '2023-02-11T10:30:00.000', end: '2023-02-11T11:15:00.000' },
    { title: 'Meeting4', start: '2023-02-11T11:15:00.000', end: '2023-02-11T12:00:00.000' },
    { title: 'Meeting5', start: '2023-02-11T12:00:00.000', end: '2023-02-11T12:45:00.000' },
    { title: 'Meeting6', start: '2023-02-11T12:45:00.000', end: '2023-02-11T13:30:00.000' },
    { title: 'Meeting6', start: '2023-02-11T12:45:00.000', end: '2023-02-11T13:30:00.000' }
  ]
};
 model = {
  dep_name:'',
  dep_desc:'',
  dep_supervisor_id:0,
  parent_id: 0,
  dep_supervisor_name:''
 }

 model2 = {
  dep_name:'',
  dep_desc:'',
  dep_supervisor_id:0,
  parent_id: 0,
  dep_supervisor_name:''
 }
  constructor(private http: HttpClient,public layoutService: LayoutService,public loaderService: LoaderService) {
    layoutService.subHeaderTitle = 'Dashboard';
  }

  ngOnInit(): void {
    //this.getDepartments();
  }

  resetForm(){
    this.model = {
      dep_name:'',
      dep_desc:'',
      dep_supervisor_id:0,
      parent_id: 0,
      dep_supervisor_name:''
     }
  }

  resetForm2(){
    this.model2 = {
      dep_name:'',
      dep_desc:'',
      dep_supervisor_id:0,
      parent_id: 0,
      dep_supervisor_name:''
     }

     document.getElementById('modalCloser')?.click();
  }

  loadModel(depId:number,openModal:boolean){
    this.deps.forEach((d)=>{
      if(d.dep_id == depId){
        this.model = d;
        this.model2 = d;
        if(openModal){
          document.getElementById('modalCloser')?.click();
        }
      }
    });
  }

  submitForm(){
    this.http.post("https://madrastyapis.azurewebsites.net/api/department",this.model).subscribe(
      {
        next: (result : any)=>{
          this.getDepartments();
          this.resetForm();
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )
  }

  submitForm2(){
    this.http.post("https://madrastyapis.azurewebsites.net/api/department",this.model2).subscribe(
      {
        next: (result : any)=>{
          this.getDepartments();
          this.resetForm2();
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )
  }

  getDepartments(){
    this.http.get("https://madrastyapis.azurewebsites.net/api/department").subscribe(
      {
        next: (result : any)=>{
          this.deps = result;
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )
  }
}
