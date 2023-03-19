import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentDataService } from 'src/app/layout/services/DepartmentDataService';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Departments',
  templateUrl: './Department.component.html',
  
})
export class DepartmentComponent implements OnInit{

  public deps : any[] = [];

  modalTitle = 'New Department'

	
  displayedColumns: string[] = ['DepartmentId', 'DepartmentName', 'DepartmentDesc',
   'DepartmentSupervisorName', 'ParentName', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  model = {
    id:0,
   dep_name:'',
   depMain: '',
   dep_desc:'',
   dep_supervisor_id:0,
   parent_id: 0,
   dep_supervisor_name:''
  }

  /**
   *
   */
  constructor(private http:HttpClient,public layoutService: LayoutService,
     public DepartmentDataService: DepartmentDataService,
     private toastr: ToastrService) {
    layoutService.subHeaderTitle = 'Departments';
  }

  resetForm(){
    this.model = {
      id:0,
        dep_name:'',
        depMain: '',
        dep_desc:'',
        dep_supervisor_id:0,
        parent_id: 0,
        dep_supervisor_name:''
     }
  }

  submitForm(){
    this.DepartmentDataService.Save(this.model).subscribe(
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

  loadModel(id:number,openModal:boolean){
		this.deps.forEach((object)=>{
		  if(object.id == id){
			this.model = object;
			if(openModal){
			  document.getElementById('modalCloser')?.click();
			}
		  }
		});
	}

	openModal(id:number){
		this.deps.forEach((object)=>{
		  if(object.id == id){
			this.model = object;
			alert(this.model.id)
			this.modalTitle = 'Edit '
			document.getElementById('modalOpener')?.click();
		  }
		});
	}

  edit(dept : any){
    this.DepartmentDataService.GetById(this.model.id).subscribe(
    {
        next: (result : any)=>{
    this.deps = result['data'][0];
  },
  error: (err)=>{
    console.log(err);
  }
    })

}

delete(dept : any){
    this.DepartmentDataService.Delete(this.model.id).subscribe(
    {
        next: (result : any)=>{
    this.getDepartments();
  },
  error: (err)=>{
    console.log(err);
  }
    })
}

  getDepartments(){
    this.DepartmentDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.deps = result['data'];
        this.dataSource = new MatTableDataSource(this.deps);
				this.dataSource.paginator = this.paginator;
				
			},
			error: (err)=>{
				console.log(err);
			}
        })
  }

  ngOnInit() {
		this.getDepartments();

		

	}

}
