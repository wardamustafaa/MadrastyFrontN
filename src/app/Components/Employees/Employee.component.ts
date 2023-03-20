import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DefinitionDataService } from 'src/app/layout/services/Definition';
import { DepartmentDataService } from 'src/app/layout/services/DepartmentDataService';
import { EmployeeDataService } from 'src/app/layout/services/EmployeeDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-Employees',
	templateUrl: './Employee.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {
	public employees : any[] = []; 
  
  modalTitle = 'New Employee'

  displayedColumns: string[] = ['Id', 'CivilNo', 'Name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
    id:0,
		name:'',
		dep_name:'',
		FileSerialNumber:0,
		sex: '',
        nationality: '',
        maritalStatus: '',
        religion: '',
        dob: '',
        ageInDay: 0,
        ageInMonth: 0,
        ageInYear: 0,
        jobType: '',
        job: '',
        departmentName: '',
        sideDepartment: '',
        relation: '',
        subject: '',
        crit_level: '',
        country_name:'',
        qualificationDate: '',
        empStatus: '',
        password: '',
        emp_exp_out_country: '',
        emp_exp_in_country_another_grade: '',
        emp_exp_in_country_same_grade: '',
        emp_exp_in_country_same_school: '',
        adress: '',
        email: '',
        mobile: '',
        telefone: '',


	}

    nationalities: any[] =[];
    maritalStatuses : any[] =[];
    sex : any[] = []
    religions: any[] = [];
    jobTypes: any[] = [];
    jobs: any[] = [];
    deps: any[] = [];
    sideDeps: any[] = [];
    relations: any[] = [];
    subjects: any[] = [];
    crit_levels: any[] = [];
    countries: any[] = [];
    Status: any[] = [];


    constructor(public layoutService: LayoutService,
      private toastr: ToastrService,
      private DefinitionDataService: DefinitionDataService, 
      private EmployeeDataService : EmployeeDataService,
      private DepartmentDataService:DepartmentDataService) {

        layoutService.subHeaderTitle = 'Employees'; 

			this.DepartmentDataService.Get().subscribe(data => this.deps = data);
		
        this.DefinitionDataService.GetBySCode("sex").subscribe(data => this.sex = data);

        this.DefinitionDataService.GetBySCode("nat").subscribe(data => this.nationalities = data);

        this.DefinitionDataService.GetBySCode("status").subscribe(data => this.maritalStatuses = data);
        
        this.DefinitionDataService.GetBySCode("religion").subscribe(data => this.religions = data);
        
        this.DefinitionDataService.GetBySCode("job_type").subscribe(data => this.jobTypes = data,);
            
        this.DefinitionDataService.GetBySCode("relation_type").subscribe(data => this.relations = data);
            
        this.DefinitionDataService.GetBySCode("crit_level").subscribe(data => this.crit_levels = data);
            
        this.DefinitionDataService.GetBySCode("emp_status").subscribe(data => this.Status = data);
       
    }
	
	submitForm(){
		
		this.EmployeeDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getPhases();
				this.resetForm();
			  },
			  error: (err)=>{
				console.log(err);
			  }
			}
		  )
	}

	resetForm(){
		this.model = {
      id:0,
            name:'',
            dep_name:'',
            FileSerialNumber:0,
            sex: '',
            nationality: '',
            maritalStatus: '',
            religion: '',
            dob: '',
            ageInDay: 0,
            ageInMonth: 0,
            ageInYear: 0,
            jobType: '',
            job: '',
            departmentName: '',
            sideDepartment: '',
            relation: '',
            subject: '',
            crit_level: '',
            country_name:'',
            qualificationDate: '',
            empStatus: '',
            password: '',
            emp_exp_out_country: '',
            emp_exp_in_country_another_grade: '',
            emp_exp_in_country_same_grade: '',
            emp_exp_in_country_same_school: '',
            adress: '',
            email: '',
            mobile: '',
            telefone: '',
		 }
	}

	getEmployees(){

		this.EmployeeDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.employees = result['data'];
        this.dataSource = new MatTableDataSource(this.employees);
				this.dataSource.paginator = this.paginator;
				
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

  edit(employee : any){
    this.EmployeeDataService.GetById(employee.id).subscribe(
    {
            next: (result : any)=>{
        this.employees = result['data'][0];
      },
      error: (err)=>{
        console.log(err);
      }
        })

  }

  loadModel(id:number,openModal:boolean){
		this.employees.forEach((object)=>{
		  if(object.id == id){
			this.model = object;
			if(openModal){
			  document.getElementById('modalCloser')?.click();
			}
		  }
		});
	}

	openModal(id:number){
		this.employees.forEach((object)=>{
		  if(object.id == id){
			this.model = object;
			alert(this.model.id)
			this.modalTitle = 'Edit '
			document.getElementById('modalOpener')?.click();
		  }
		});
	}

  delete(employee : any){
    this.EmployeeDataService.Delete(employee.id).subscribe(
    {
          next: (result : any)=>{
      this.getEmployees();
    },
    error: (err)=>{
      console.log(err);
    }
      })
  }

	ngOnInit() {
		this.getEmployees();

	}

}
