import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public deps : any[] = [];
  model = {
   dep_name:'',
   dep_desc:'',
   dep_supervisor_id:0,
   parent_id: 0,
   dep_supervisor_name:''
  }

  /**
   *
   */
  constructor(private http:HttpClient,public layoutService: LayoutService) {
    layoutService.subHeaderTitle = 'Departments';
  }

  ngOnInit(): void {
    
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

  getDepartments(){
    // this.http.get("https://madrastyapis.azurewebsites.net/api/department").subscribe(
    //   {
    //     next: (result : any)=>{
    //       this.deps = result;
    //     },
    //     error: (err)=>{
    //       console.log(err);
    //     }
    //   }
    // )
  }

}
