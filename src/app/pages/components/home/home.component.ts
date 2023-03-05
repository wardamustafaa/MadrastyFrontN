import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 public deps : any[] = [];
 modalTitle = 'New Department'
 model2 = {
  dep_id:0,
  dep_name:'',
  dep_desc:'',
  dep_supervisor_id:0,
  parent_id: 0,
  dep_supervisor_name:''
 }
  constructor(private http: HttpClient,public layoutService: LayoutService,private toastr: ToastrService) {
    layoutService.subHeaderTitle = 'Departments';
  }

  ngOnInit(): void {
    this.getDepartments();
    //this.toastr.success('Page Loaded Successfully', 'Successeded Process')
  }

  resetForm2(){
    this.model2 = {
      dep_id:0,
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
        this.model2 = d;
        if(openModal){
          document.getElementById('modalCloser')?.click();
        }
      }
    });
  }

  submitForm2(){
    if(this.model2.dep_id < 1){

    }
    this.http.post("https://madrastyapis.azurewebsites.net/api/department",this.model2).subscribe(
      {
        next: (result : any)=>{
          this.toastr.warning('dfnjsdknvljkdcnvlkjvnxczm,vn.mz,xn')
          this.getDepartments();
          this.resetForm2();
        },
        error: (err)=>{
          this.toastr.error('dfnjsdknvljkdcnvlkjvnxczm,vn.mz,xn')

          console.log(err);
        }
      }
    )
  }

  openModal(depId:number){
    this.deps.forEach((d)=>{
      if(d.dep_id == depId){
        this.model2 = d;
        alert(this.model2.dep_id)
        this.modalTitle = 'Edit '
        document.getElementById('modalOpener')?.click();
      }
    });
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
